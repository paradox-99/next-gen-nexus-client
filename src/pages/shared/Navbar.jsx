import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import React from "react";
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { SiBmcsoftware } from "react-icons/si";
import { CustomButton } from "../../components/basic/basicComponents";
import useAuth from "../../hooks/useAuth";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import useDesignation from "../../hooks/useDesignation";

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Open = Boolean(anchorEl);
    const [designation] = useDesignation();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={"Home"} disablePadding style={{ fontFamily: [''].join(',') }}>
                    <ListItemButton to={'/'}>
                        <ListItemIcon>
                        <FaHome />
                        </ListItemIcon>
                        <ListItemText style={{ fontFamily: ['"Poppins"'] }} primary={"Home"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Products"} disablePadding>
                    <ListItemButton to={'/products'} >
                        <ListItemIcon>
                            <SiBmcsoftware />
                        </ListItemIcon>
                        <ListItemText primary={"Products"} />
                    </ListItemButton>
                </ListItem>
                {
                    !user && <ListItem key={"Sign in"} disablePadding>
                        <ListItemButton>
                            <NavLink to={'/signin'}></NavLink>
                            <ListItemIcon>
                                <SiBmcsoftware />
                            </ListItemIcon>
                            <ListItemText primary={"Sign in"} />
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box>
    );


    return (
        <div className="px-2 lg:px-20 w-full z-10 bg-[#15151580] py-2 flex justify-between items-center fixed top-0">
            <div className="flex">
                <div className="flex md:hidden font-poppins">
                    <Button onClick={toggleDrawer(true)} style={{ fontSize: 24, color: "white", paddingLeft: 0, paddingRight: 0, minWidth: 24 }}><HiMenu /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
                <Link to={'/'} className="font-montserrat font-bold text-3xl md:flex hidden tracking-widest text-white">NextGenNexus</Link>
            </div>
            <div className="flex">
                <Link to={'/'} className="font-montserrat font-bold text-2xl smm:text-xl lg:text-3xl flex md:hidden text-white">NextGenNexus</Link>
                <ul className="md:flex hidden gap-10 font-poppins text-xl text-white">
                    <li><NavLink to={'/'} className="flex gap-1 items-center"><FaHome />Home</NavLink></li>
                    <li><NavLink to={'/products'} className="flex items-center gap-1"><SiBmcsoftware />Products</NavLink></li>
                </ul>
            </div>
            <div className="flex gap-4">

                {
                    !user && <Link to={'/signin'}><CustomButton>Sign in</CustomButton></Link>
                }
                {
                    user && <><Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title={user?.displayName}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 0 }}
                                aria-controls={Open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={Open ? 'true' : undefined}
                            >
                                <img src={user?.photoURL} alt="" className="rounded-full w-12 h-12" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Typography sx={{ paddingLeft: 2, paddingRight: 5, fontSize: 20, fontWeight: 600 }}>{user?.displayName}</Typography>
                            <MenuItem onClick={handleClose}>
                            {
                                designation === "user" && <Link to={'/dashboard/userProfile'} className="flex items-center gap-2"><TbLayoutDashboardFilled /> Dashboard</Link>
                            }
                            {
                                designation === "admin" && <Link to={'/dashboard/adminDashboard'} className="flex items-center gap-2"><TbLayoutDashboardFilled /> Dashboard</Link>
                            }
                            {
                                designation === "moderator" && <Link to={'/dashboard/productsReview'} className="flex items-center gap-2"><TbLayoutDashboardFilled /> Dashboard</Link>
                            }
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={logOut}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;