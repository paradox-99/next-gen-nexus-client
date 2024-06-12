import { Button, Chip, Divider, Grow, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, createTheme } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { Verified } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const montserratFont = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),
    },
});

const UserProfile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [alignment, setAlignment] = useState("25");
    const subscriptionStatus = false;
    const [checked, setChecked] = useState(false);
    const [couponCode, setCouponCode] = useState();
    const [subscriptionValue, setSubscriptionValue] = useState(25);
    const [isValid, setIsValid] = useState(false);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
        const value = parseInt(newAlignment)
        setSubscriptionValue(value);
    };

    const couponValue = (event) => {
        const value = event.target.value;
        setCouponCode(value);
    }

    const countOriginalValue = async () => {
        await axiosSecure.get(`/checkCoupon?code=${couponCode}`)
            .then(res => {
                if (res.data.message === 'coupon is valid') {
                    setIsValid(true);
                    const discount = res.data.discount;
                    const originalValue = subscriptionValue - (subscriptionValue * (discount / 100));
                    setSubscriptionValue(originalValue);
                }
                else {
                    toast.error("Invalid coupon code.")
                }
            })
    }

    const applyCouponCode = () => {
        const value = parseInt(alignment);
        setSubscriptionValue(value);
        countOriginalValue();
    }

    const subscribeUser = () => {
        console.log(subscriptionValue);
    }


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex gap-6">
                <div className="flex flex-col items-center justify-center">
                    <figure>
                        <img src={user?.photoURL} alt={user?.displayName} className="w-52 h-52 rounded-full" />
                    </figure>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                <div>
                    <h1 className="text-5xl font-semibold mt-8">{user?.displayName}</h1>
                    <h3 className="text-xl font-medium mt-3">Email: {user?.email}</h3>
                    <div className={`${!subscriptionStatus ? 'block' : 'hidden'}`}>
                        <div className="mt-10">
                            <h3 className="text-lg font-medium">Buy subscription to get pro service.</h3>
                            <button onClick={() => setChecked(!checked)} className="px-4 py-2 mt-3 bg-orange-300 rounded-full font-medium font-montserrat">Subscribe</button>
                            <div className="h-52 w-96 flex items-center">
                                <Grow
                                    in={checked}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(checked ? { timeout: 1000 } : {})}>
                                    <div className={`space-x-4 `}>
                                        <span className="font-poppins text-lg">Select Package:</span>
                                        <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            onChange={handleAlignment}
                                        >
                                            <ToggleButton value="15" aria-label="left aligned">
                                                <span className="px-3 font-bold text-base">$15</span>
                                            </ToggleButton>
                                            <ToggleButton value="25" aria-label="centered">
                                                <span className="px-3 font-bold text-base">$25</span>
                                            </ToggleButton>
                                            <ToggleButton value="50" aria-label="right aligned">
                                                <span className="px-3 font-bold text-base">$50</span>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        <br />
                                        <div className="mt-4 flex items-center gap-5">
                                            <TextField onChange={couponValue} variant="outlined" placeholder="Enter Coupon code" label="Coupon code" name="couponCode" />
                                            <Button {...isValid && {disabled: true}} onClick={applyCouponCode} variant="outlined">Apply</Button>
                                        </div>
                                        <br />
                                        <p className="font-poppins">Payable amount: <span className="font-medium text-lg">${subscriptionValue}</span></p>
                                        <button onClick={subscribeUser} className="px-3 py-2 rounded-full border bg-blue-300 hover:bg-blue-200 font-semibold font-montserrat">Buy</button>
                                    </div>
                                </Grow>
                            </div>
                        </div>
                    </div>
                    <ThemeProvider theme={montserratFont}>
                        <div className={`mt-3 ${subscriptionStatus ? 'block' : 'hidden'}`}>
                            <Chip icon={<Verified style={{ color: blue[600] }} />} label="Verified" style={{ fontSize: 20, fontWeight: 600 }} />
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;