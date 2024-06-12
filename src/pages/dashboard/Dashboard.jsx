import { Add, Logout, ReportOutlined, ReviewsOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, createTheme } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { SiBmcsoftware } from "react-icons/si";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidCoupon } from "react-icons/bi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import useDesignation from "../../hooks/useDesignation";
import React from "react";
import { HiMenu } from "react-icons/hi";

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

    const [designation] = useDesignation();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FE654F' }}>
            <div className="flex justify-center flex-col items-center my-10">
                            <figure>
                                <img src="/favicon.png" alt="" />
                            </figure>
                            <h1 className="text-2xl md:text-3xl font-bold mt-5">NexGenNexus</h1>
                        </div>
            <nav aria-label="main mailbox folders">
                <List>
                    {designation === 'user' && <>
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
                    </>}
                    {designation === 'moderator' && <>
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
                    </>}
                    {designation === 'admin' && <>
                        <ListItem disablePadding>
                            <ListItemButton href="/dashboard/adminDashboard">
                                <ListItemIcon style={{ fontSize: 25 }}>
                                    <TbLayoutDashboardFilled />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton href="/dashboard/manageUsers">
                                <ListItemIcon style={{ fontSize: 25 }}>
                                    <FaUsersGear />
                                </ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton href="/dashboard/manageCoupons">
                                <ListItemIcon style={{ fontSize: 25 }}>
                                    <BiSolidCoupon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Coupons" />
                            </ListItemButton>
                        </ListItem>
                    </>}
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
            <nav aria-label="main mailbox folders" >
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
    )

    return (
        <div className="flex">
            <ThemeProvider theme={montserratFont}>
                <div className="w-72 bg-[#FE654F] lg:flex flex-col gap-10 hidden">
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FE654F' }}>
                        <div className="flex justify-center flex-col items-center my-10">
                            <figure>
                                <img src="/favicon.png" alt="" />
                            </figure>
                            <h1 className="text-3xl font-bold mt-5">NexGenNexus</h1>
                        </div>
                        <nav aria-label="main mailbox folders">
                            <List>
                                {designation === 'user' && <>
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
                                </>}
                                {designation === 'moderator' && <>
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
                                </>}
                                {designation === 'admin' && <>
                                    <ListItem disablePadding>
                                        <ListItemButton href="/dashboard/adminDashboard">
                                            <ListItemIcon style={{ fontSize: 25 }}>
                                                <TbLayoutDashboardFilled />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton href="/dashboard/manageUsers">
                                            <ListItemIcon style={{ fontSize: 25 }}>
                                                <FaUsersGear />
                                            </ListItemIcon>
                                            <ListItemText primary="Manage Users" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton href="/dashboard/manageCoupons">
                                            <ListItemIcon style={{ fontSize: 25 }}>
                                                <BiSolidCoupon />
                                            </ListItemIcon>
                                            <ListItemText primary="Manage Coupons" />
                                        </ListItemButton>
                                    </ListItem>
                                </>}
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
                <div className="flex flex-col lg:hidden font-poppins">
                    <Button onClick={toggleDrawer(true)} style={{ fontSize: 24, color: "black", paddingLeft: 0, paddingRight: 0, minWidth: 24, height: 'fit' }}><HiMenu /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            </ThemeProvider>
            <div className="w-full min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;