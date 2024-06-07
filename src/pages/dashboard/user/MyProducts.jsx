import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import { MdOutlineUpdate, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Title from "../../shared/Title";

const montserratFont = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
        fontSize: 20,
        fontWeightMedium: 600
    },
});

const poppinsFont = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
        fontSize: 16,
    },
});

const MyProducts = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { refetch, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/userProducts/${user?.email}`)
            return response.data;
        }
    })

    const deleteProduct = async (id, email) => {
        await axiosPublic.delete(`/deleteProducts/product?id=${id}&email=${email}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Deleted successfully.")
                    refetch();
                }
            })
    }

    return (
        <div className="flex flex-col w-full items-center px-20 mt-16">
            <Title title={"My Products"}></Title>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <ThemeProvider theme={montserratFont}>
                        <TableHead>
                            <TableRow style={{ fontWeight: 600 }}>
                                <TableCell>Product name</TableCell>
                                <TableCell align="left">Upvote</TableCell>
                                <TableCell align="left">Downvote</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                    </ThemeProvider>
                    <ThemeProvider theme={poppinsFont}>
                        <TableBody>
                            {data?.map((product) => (
                                <TableRow
                                    hover
                                    key={product.product_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.product_name}
                                    </TableCell>
                                    <TableCell align="left">{product.upvote_count}</TableCell>
                                    <TableCell align="left">{product.downvote_count}</TableCell>
                                    <TableCell align="left">{product.carbs}</TableCell>
                                    <TableCell align="right">
                                        <button className="flex items-center gap-1 outline outline-1 px-2 py-1 rounded"><MdOutlineUpdate />
                                            Update
                                        </button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => deleteProduct(product._id, product.product_owner_info.owner_email)} className="flex items-center gap-1 text-red-600 outline outline-1 px-2 py-1 rounded"><MdDelete />
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </ThemeProvider>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyProducts;