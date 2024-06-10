import { useQuery } from "@tanstack/react-query";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import Title from "../../shared/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    // const { user } = useAuth();

    const { refetch, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users`)
            return response.data;
        }
    })

    const makeAdmin = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Proceed"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/makeAdmin/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Successful!",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    const makeModerator = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Proceed"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/makeModerator/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <div className="flex flex-col w-full px-32 mt-12">
            <Title title={"Manage Users"}></Title>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <ThemeProvider theme={montserratFont}>
                            <TableHead>
                                <TableRow style={{ fontWeight: 600 }}>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                        </ThemeProvider>
                        <ThemeProvider theme={poppinsFont}>
                            <TableBody>
                                {data?.map((user) => (
                                    <TableRow
                                        hover
                                        key={user._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.email}
                                        </TableCell>
                                        <TableCell align="left">
                                            {user?.designation === "admin" ? <p>Admin</p> : user?.designation === "moderator" ? <p>Moderator</p> : <button onClick={() => makeModerator(user._id)} className="outline outline-1 px-2 py-1 rounded">
                                                Make Moderator
                                            </button>}
                                        </TableCell>
                                        <TableCell align="left">
                                            {
                                                (user?.designation !== "admin" || user?.designation !== "moderator") && <button onClick={() => makeAdmin(user._id)} className={`${user?.designation === "admin" ? "hidden" : "flex"} items-center gap-1 text-red-600 outline outline-1 px-2 py-1 rounded`}>
                                                    Make Admin
                                                </button>
                                            }
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

export default ManageUsers;