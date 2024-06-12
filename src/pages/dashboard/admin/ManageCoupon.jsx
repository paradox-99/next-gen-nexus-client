import { useQuery } from "@tanstack/react-query";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Title from "../../shared/Title";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { CancelOutlined } from "@mui/icons-material";
import { CustomTextField } from "../../../components/basic/basicComponents";
import Swal from "sweetalert2";
import { IoIosAddCircleOutline } from "react-icons/io";
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
        fontSize: 18,
    },
});

const ManageCoupon = () => {

    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [isEditable, setEditable] = useState(false);
    const [coup, setCoup] = useState();
    const [addOrUpdate, setAddOrUpdate] = useState(true);

    const { refetch, data: coupons } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const response = await axiosSecure.get('/coupons');
            return response.data;
        }
    })

    const deleteCoupon = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/deleteCoupon/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Coupon has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const viewDetails = coupon => {
        setCoup(coupon)
        handleClickOpen();
        setEditable(false);
    }

    const setEdit = () => {
        setOpen(true);
        setEditable(true);
        setAddOrUpdate(false);
    }

    const setEdit2 = (coupon) => {
        setCoup(coupon)
        handleClickOpen();
        setEditable(true);
        setAddOrUpdate(false);
    }

    const updateCoupon = async (id, info) => {
        await axiosSecure.put(`/updateCoupon/${id}`, info)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Updated successfully.")
                    refetch();
                    setOpen(false);
                }
            })

    }

    const openNewCoupon = () => {
        setOpen(true);
        setEditable(true);
        setAddOrUpdate(true);
        setCoup(null);
    }

    const addNewCoupon = async (info) => {
        await axiosSecure.post('/addCoupon', info)
            .then(res => {
                if (res.data.insertedId) {
                    setOpen(false);
                    toast.success("Added successfully.")
                    refetch();
                }
            })
    }

    return (
        <div className="flex flex-col w-full items-center md:px-7 lg:px-14 xl:px-20 xl:mt-16 lg:mt-14 md:mt-8 mt-5">
            <Title title={"Coupons"}></Title>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                    <Table sx={{ width: '100%' }} aria-label="simple table" stickyHeader >
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
                                        key={coupon._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {coupon.coupon_code}
                                        </TableCell>
                                        <TableCell align="left">{coupon.expiration_date}</TableCell>
                                        <TableCell align="left">{coupon.discount_amount}%</TableCell>
                                        <TableCell align="left"><button onClick={() => viewDetails(coupon)} className="text-2xl px-2 py-1 rounded"><IoEyeOutline /></button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button onClick={() => setEdit2(coupon)} className="px-2 py-1 text-2xl"><FaRegEdit /></button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button onClick={() => deleteCoupon(coupon._id)} className="text-red-600 text-2xl px-2 py-1 rounded"><MdDelete />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </ThemeProvider>
                    </Table>
                </TableContainer>
            </Paper>
            <div className="absolute right-20 bottom-5">
                <IconButton style={{ color: "black" }} onClick={openNewCoupon}>
                    <IoIosAddCircleOutline className="text-4xl" />
                </IconButton>
            </div>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const coupon_code = formJson.code;
                        const expiration_date = formJson.expiry_date;
                        const coupon_description = formJson.description;
                        const discount_amount = formJson.discount;

                        const info = { coupon_code, expiration_date, coupon_description, discount_amount }
                        if (coup?._id)
                            updateCoupon(coup?._id, info)
                        else
                            addNewCoupon(info)
                    },
                }}
                maxWidth="md"
            >
                <div className="flex justify-between">
                    <ThemeProvider theme={montserratFont}>
                        <DialogTitle style={{ fontWeight: 600 }}>Details</DialogTitle>
                    </ThemeProvider>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ color: "black", fontSize: 16 }}><CancelOutlined /></Button>
                    </DialogActions>
                </div>
                <ThemeProvider theme={poppinsFont}>
                    <DialogContent>
                        <div className="flex flex-col md:flex-row gap-5">
                            <CustomTextField
                                autoFocus
                                required
                                id="name"
                                name="code"
                                defaultValue={coup?.coupon_code}
                                label="Coupon code"
                                type="text"
                                fullWidth
                                variant="standard"
                                {...isEditable ? { disabled: false } : { disabled: true }}

                            />
                            <CustomTextField
                                autoFocus
                                required
                                id="name"
                                label='Expiry date'
                                name="expiry_date"
                                defaultValue={coup?.expiration_date}
                                type="date"
                                fullWidth
                                variant="standard"
                                {...isEditable ? { disabled: false } : { disabled: true }}
                            />
                            <CustomTextField
                                autoFocus
                                required
                                id="name"
                                name="discount"
                                label="Discount amount"
                                defaultValue={coup?.discount_amount}
                                type="text"
                                fullWidth
                                variant="standard"
                                {...isEditable ? { disabled: false } : { disabled: true }}
                            />
                        </div>
                        <CustomTextField
                            autoFocus
                            required
                            id="name"
                            name="description"
                            label="Coupon description"
                            defaultValue={coup?.coupon_description}
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            {...isEditable ? { disabled: false } : { disabled: true }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className={`flex gap-10 ${isEditable ? 'block' : 'hidden'}`}>
                            <button type="submit" onSubmit={onsubmit} className={`outline font-poppins outline-1 px-2 py-1 mr-5 rounded ${isEditable ? 'block' : 'hidden'} hover:bg-[#D6EFFF]`}>{addOrUpdate ? "Add" : "Update"}</button>

                            <button onClick={() => setEditable(false)} className={`outline font-poppins outline-1 px-2 py-1 rounded ${isEditable ? 'block' : 'hidden'} hover:bg-[#D6EFFF] ${addOrUpdate ? 'hidden' : 'block'}`}>Cancel</button>
                        </div>
                        <div className={`${!isEditable ? 'block' : 'hidden'}`}>
                            <button onClick={setEdit} {...!isEditable ? { disabled: false } : { disabled: true }} className="px-2 py-1 text-2xl"><FaRegEdit /></button>
                            <button onClick={() => deleteCoupon()} className="text-red-600 text-2xl px-2 py-1 rounded"><MdDelete />
                            </button>
                        </div>
                    </DialogActions>
                </ThemeProvider>
            </Dialog>
        </div>
    );
};

export default ManageCoupon;