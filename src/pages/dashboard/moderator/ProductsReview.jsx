import { useQuery } from "@tanstack/react-query";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import toast from "react-hot-toast";
import { RemoveCircleOutline } from "@mui/icons-material";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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


const ProductsReview = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/reviewProducts`)
            return response.data;
        }
    })

    const acceptProduct = async (id) => {
        await axiosSecure.patch(`/makeAccepted/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Products have been successfully published.")
                    refetch();
                }
            })
    }

    const rejectProduct = async (id) => {
        await axiosSecure.patch(`/rejectProduct/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Product rejected.")
                    refetch();
                }
            })
    }

    const makeFeatured = async (id) => {
        await axiosSecure.patch(`/makeFeatured/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Made Product featured.")
                    refetch();
                }
            })
    }

    return (
        <div className="flex flex-col w-full items-center px-20 mt-10">
            <Title title={"Review Products"}></Title>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <ThemeProvider theme={montserratFont}>
                            <TableHead>
                                <TableRow style={{ fontWeight: 600 }}>
                                    <TableCell>Product name</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
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
                                            <button {...product.status === "featured" ? { disabled: true } : { disabled: false }} onClick={() => makeFeatured(product._id)} className={`flex items-center gap-1  outline outline-1 px-2 py-1 rounded ${(product.status === 'featured') ? "text-gray-400 hover:cursor-not-allowed" : "text-yellow-600"}`}>
                                                Make Featured
                                            </button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <button {...product.status === "featured" ? { disabled: true } : { disabled: false }} {...product.status !== "pending" ? { disabled: true } : { disabled: false }} {...product.status !== "rejected" ? { disabled: true } : { disabled: false }} onClick={() => acceptProduct(product._id)} className={`flex items-center gap-1  outline outline-1 px-2 py-1 rounded ${(product.status !== 'pending' && product.status === 'featured' && product.status !== "rejected") ? 'text-gray-400 hover:cursor-not-allowed' : 'text-green-600'}`}><IoCheckmarkCircleOutline />
                                                Accept
                                            </button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button {...product.status === "rejected" ? { disabled: true } : { disabled: false }} onClick={() => rejectProduct(product._id)} className={`flex items-center gap-1  outline outline-1 px-2 py-1 rounded ${(product.status === 'rejected') ? "text-gray-400 hover:cursor-not-allowed" : "text-red-600"} `}><RemoveCircleOutline />
                                                Reject
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </ThemeProvider>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ProductsReview;