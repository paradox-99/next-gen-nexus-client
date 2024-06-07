import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";
import { MdDelete } from "react-icons/md";

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


const ReportedContents = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { refetch, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/userProducts/${user?.email}`)
            return response.data;
        }
    })

    const deleteProduct = async (id) => {
        await axiosPublic.delete(`/deleteProducts/product?id=${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Deleted successfully.")
                    refetch();
                }
            })
    }

    return (
        <div className="flex flex-col w-full justify-center items-center px-60 mt-16">
            <Title title={"Reported Products"}></Title>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <ThemeProvider theme={montserratFont}>
                        <TableHead>
                            <TableRow style={{ fontWeight: 600 }}>
                                <TableCell>Product name</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                    </ThemeProvider>
                    <ThemeProvider theme={poppinsFont}>
                        <TableBody>
                            {data?.map((product) => (
                                <TableRow
                                    hover
                                    key={product._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.product_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Link to={`/viewDetails/${product._id}`} className="outline outline-1 px-2 py-1 rounded">
                                            Details
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <button onClick={() => deleteProduct(product._id)} className="flex items-center gap-1 text-red-600 outline outline-1 px-2 py-1 rounded">
                                            <MdDelete />
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

export default ReportedContents;