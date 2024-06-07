import { Add, Logout, ReportOutlined, ReviewsOutlined } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, createTheme } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { SiBmcsoftware } from "react-icons/si";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const montserratFont = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
});

const Dashboard = () => {

    const { logOut } = useAuth();

    return (
        <div className="flex">
            <ThemeProvider theme={montserratFont}>
                <div className="w-72 min-h-screen bg-[#FE654F] flex flex-col gap-10">
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FE654F' }}>
                        <div className="flex justify-center flex-col items-center my-10">
                            <figure>
                                <img src="/favicon.png" alt="" />
                            </figure>
                            <h1 className="text-3xl font-bold mt-5">NexGenNexus</h1>
                        </div>
                        <nav aria-label="main mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton href="/dashboard/userProfile">
                                        <ListItemIcon style={{ fontSize: 25 }}>
                                            <CgProfile />
                                        </ListItemIcon>
                                        <ListItemText primary="My Profile" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton href="/dashboard/addProducts">
                                        <ListItemIcon style={{ fontSize: 25 }}>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Products" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton href="/dashboard/myProducts">
                                        <ListItemIcon style={{ fontSize: 25 }}>
                                            <SiBmcsoftware />
                                        </ListItemIcon>
                                        <ListItemText primary="My Products" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton href="/dashboard/productsReview">
                                        <ListItemIcon style={{ fontSize: 25 }}>
                                            <ReviewsOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="Review Products" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton href="/dashboard/reportedContents">
                                        <ListItemIcon style={{ fontSize: 25 }}>
                                            <ReportOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="Reported Products" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton href="/">
                                        <ListItemIcon>
                                            <FaHome />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton href="/products">
                                        <ListItemIcon>
                                            <SiBmcsoftware />
                                        </ListItemIcon>
                                        <ListItemText primary="Products" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <nav className="absolute bottom-0" aria-label="main mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={logOut} href="/signin">
                                        <ListItemIcon>
                                            <Logout />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign out" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                    </Box>
                </div>
            </ThemeProvider>
            <div className="w-full min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;