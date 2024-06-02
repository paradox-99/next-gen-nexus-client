import { Add, Drafts, Inbox } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { SiBmcsoftware } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-72 min-h-screen bg-[#FE654F] flex flex-col gap-10">
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#FE654F', fontFamily: '"Montserrat", sans-serif' }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton href="/dashboard/userProfile">
                                    <ListItemIcon style={{fontSize: 25}}>
                                        <CgProfile/>
                                    </ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton href="/dashboard/addProducts">
                                    <ListItemIcon style={{fontSize: 25}}>
                                        <Add/>
                                    </ListItemIcon>
                                    <ListItemText primary="Add Products" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton href="/dashboard/myProducts">
                                    <ListItemIcon style={{fontSize: 25}}>
                                    <SiBmcsoftware />
                                    </ListItemIcon>
                                    <ListItemText primary="My Products" />
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
                </Box>
            </div>
            <div className="w-full min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;