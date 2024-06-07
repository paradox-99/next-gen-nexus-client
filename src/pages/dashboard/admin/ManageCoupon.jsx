import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAuth from "../../../hooks/useAuth";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Title from "../../shared/Title";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

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
        fontSize: 18,
    },
});

const ManageCoupon = () => {

    const axiosPublic = useAxiosPublic();
    // const { user } = useAuth();

    const { refetch, data: coupons } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const response = await axiosPublic.get('/coupons');
            return response.data;
        }
    })

    console.log(coupons);

    const deleteProduct = async (id, email) => {
        await axiosPublic.delete(`/deleteProducts/product?id=`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Deleted successfully.")
                    refetch();
                }
            })
    }

    return (
        <div className="flex flex-col w-full items-center px-20 mt-16">
            <Title title={"Coupons"}></Title>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <ThemeProvider theme={montserratFont}>
                        <TableHead>
                            <TableRow style={{ fontWeight: 600 }}>
                                <TableCell>Coupon Code</TableCell>
                                <TableCell align="left">Expiry Date</TableCell>
                                <TableCell align="left">Discount</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                    </ThemeProvider>
                    <ThemeProvider theme={poppinsFont}>
                        <TableBody>
                            {coupons?.map((coupon) => (
                                <TableRow
                                    hover
                                    key={coupon.product_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {coupon.coupon_code}
                                    </TableCell>
                                    <TableCell align="left">{coupon.expiration_date}</TableCell>
                                    <TableCell align="left">{coupon.discount_amount}%</TableCell>
                                    <TableCell align="left"><button className="text-2xl px-2 py-1 rounded"><IoEyeOutline /></button></TableCell>
                                    <TableCell align="right">
                                        <button className="px-2 py-1 text-2xl"><FaRegEdit /></button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <button onClick={() => deleteProduct(coupon._id, coupon.product_owner_info.owner_email)} className="text-red-600 text-2xl px-2 py-1 rounded"><MdDelete />
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

export default ManageCoupon;