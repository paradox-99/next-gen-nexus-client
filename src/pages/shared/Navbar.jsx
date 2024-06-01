import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import React from "react";
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Home } from "@mui/icons-material";
import { SiBmcsoftware } from "react-icons/si";
import { CustomButton } from "../../components/basic/basicComponents";

const Navbar = () => {

    const user = false;

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={"Home"} disablePadding style={{ fontFamily: [''].join(',') }}>
                    <ListItemButton to={'/'}>
                        <ListItemIcon>
                            <Home />
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
                    user && <ListItem key={"Products"} disablePadding>
                        <ListItemButton>
                            <NavLink to={'/products'}></NavLink>
                            <ListItemIcon>
                                <SiBmcsoftware />
                            </ListItemIcon>
                            <ListItemText primary={"Products"} />
                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box>
    );


    return (
        <div className="px-5 lg:px-20 w-full py-5 flex justify-between items-center fixed top-0">
            <div className="flex">
                <div className="flex md:hidden font-poppins">
                    <Button onClick={toggleDrawer(true)} style={{ fontSize: 24, color: "gray", paddingLeft: 0, minWidth: 24 }}><HiMenu /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
                <Link to={'/'} className="font-montserrat font-bold text-3xl md:flex hidden tracking-widest">NextGenNexus</Link>
            </div>
            <div className="flex">
                <Link to={'/'} className="font-montserrat font-bold text-2xl smm:text-xl lg:text-3xl flex md:hidden">NextGenNexus</Link>
                <ul className="md:flex hidden gap-10 font-poppins text-xl">
                    <li><NavLink to={'/'} className="flex items-center"><Home />Home</NavLink></li>
                    <li><NavLink to={'/products'} className="flex items-center" items-center><SiBmcsoftware />Products</NavLink></li>
                </ul>
            </div>
            <div>
                <Link to={'/signin'}><CustomButton>Sign in</CustomButton></Link>
            </div>
        </div>
    );
};

export default Navbar;