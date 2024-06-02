import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, Slide } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomButton, CustomTextField } from "../../components/basic/basicComponents";
import img from '../../assets/loginPic.png'
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import React, { useContext, useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp, IoWarningOutline } from "react-icons/io5";
import { GitHub, Google } from "@mui/icons-material";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { createUser } from "../../components/createUser/createUser";

const schema = z.object({
    name: z.string(),
    url: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
    terms: z.boolean(),
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Register = () => {

    const { handleCreateUser, logOut, handleGoogleLogin, handleGitHubLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    const [open, setOpen] = React.useState(false);

    const onSubmit = async (data) => {
        setError('');
        await new Promise(resolve => setTimeout(() => resolve(), 1000));

        const email = data.email;
        const password = data.password;
        const name = data.name;
        const url = data.url;
        const terms = data.terms;

        if (!terms) {
            setError('Accept the terms and conditions')
            return;
        }

        handleCreateUser(email, password)
            .then(res => {
                updateProfile(res.user, { displayName: name, photoURL: url })
                    .then(() => {
                        const info = { uid: res.user.uid, email, name, url };
                        createUser(info)
                        setOpen(true)
                    })
                    .catch(err => setError(err.message))
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).')
                    setError('Email is already in use!')
            });

    }

    const googleLogin = () => {
        handleGoogleLogin()
            .then(res => {
                if (res.user) {
                    const info = { uid: res.user.uid, email: res.user.email, name: res.user.displayName, url: res.user.photoURL };
                    createUser(info)
                    setOpen(true);
                }
            })
            .catch((error) => { setError(error.message) });
    }

    const gitHubLogin = () => {
        handleGitHubLogin()
            .then(res => {
                if (res.user){
                    const info = { uid: res.user.uid, email: res.user.email, name: res.user.displayName, url: res.user.photoURL };
                    createUser(info)
                    setOpen(true);
                }
            })
            .catch((error) => { setError(error.message) });
    }

    useEffect(() => {
        logOut();
    }, [])

    const handleClose = () => {
        setOpen(false);
        navigate('/signin')
    };


    return (
        <div className="w-full flex justify-center items-center mt-64 md:mt-32 xl:mt-10">
            <div className="xl:px-28 py-14 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#D6EFFF] h-full rounded-l-md p-4 md:p-10 flex flex-col justify-center items-center pr-5">
                    <img src={img} alt="" className="w-4/5" />
                    <h1 className="text-center font-bold text-3xl md:text-4xl mb-6">NextGenNexus</h1>
                    <p className="text-xl text-center">Focuses on next-generation tech and a central place for tech enthusiasts.</p>
                </div>
                <div className="h-full bg-[#FED99B] p-4 md:p-10 rounded-r-md">
                    <h3 className="text-center font-medium text-2xl mb-4 tracking-widest">Welcome to NextGenNexus</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
                        <Box
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 'full' },
                            }}
                            autoComplete="off"
                        >
                            <div className="flex flex-col">
                                <CustomTextField
                                    required
                                    id="standard-required"
                                    label="Name"
                                    type="text"
                                    variant="standard"
                                    {...register('name')}
                                    style={{ marginTop: 15 }}
                                />
                                {
                                    errors.name && (<p className="text-red-500 ml-2">{errors.name.message}</p>)
                                }
                                <CustomTextField
                                    required
                                    id="standard-required"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    {...register('email')}
                                    style={{ marginTop: 15 }}
                                />
                                {
                                    errors.email && (<p className="text-red-500 ml-2">{errors.email.message}</p>)
                                }
                                <div className="relative">
                                    <CustomTextField
                                        id="standard-password-input"
                                        label="Password*"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        variant="standard"
                                        {...register('password')}
                                        style={{ marginTop: 15 }}
                                        fullWidth
                                    >
                                    </CustomTextField>
                                    <span className="text-xl absolute right-0 bottom-4">{showPassword ? <IoEyeOffSharp onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp onClick={() => setShowPassword(!showPassword)} />}</span>
                                </div>
                                {
                                    errors.password && (<p className="text-red-500 ml-2">{errors.password.message}</p>)
                                }
                                <CustomTextField
                                    required
                                    id="standard-required"
                                    label="Photo URL"
                                    type="url"
                                    variant="standard"
                                    {...register('url')}
                                    style={{ marginTop: 15 }}
                                />
                                {
                                    errors.url && (<p className="text-red-500 ml-2">{errors.url.message}</p>)
                                }
                                <div className="flex justify-center font-medium mt-3">
                                    <label className="flex justify-center items-center gap-2">
                                        <input {...register('terms')} type="checkbox" />
                                        Accept our terms and conditions.
                                    </label>
                                    {errors.conditions && (<p className="text-red-500">{errors.conditions.message}</p>)}
                                </div>
                                {
                                    error && (<div className="flex justify-center items-center gap-1 text-red-500"><IoWarningOutline /><p className="text-lg">{error}</p></div>)
                                }
                                <CustomButton type="submit" style={{ marginTop: 15, fontSize: 20, backgroundColor: '#FE654F' }}>{isSubmitting ? "Loading..." : "Submit"}</CustomButton>
                                <p className="font-poppins text-lg mt-3 text-center">Already have an account. <Link to={'/signin'} className="text-blue-800 hover:underline">Sign in</Link></p>
                                <Divider style={{ marginTop: 20 }}>OR</Divider>
                                <div className="flex justify-evenly mt-8">
                                    <Button onClick={googleLogin} variant="outlined" style={{ color: "black", borderColor: "black" }} startIcon={<Google />}>
                                        Google
                                    </Button>
                                    <Button onClick={gitHubLogin} variant="outlined" style={{ color: "black", borderColor: "black" }} startIcon={<GitHub />}>
                                        GitHub
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ fontSize: 30 }}>{"Login Successful"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" style={{ fontSize: 18 }}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Register;