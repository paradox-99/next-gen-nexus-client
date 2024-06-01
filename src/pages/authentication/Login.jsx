import { Box, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomButton, CustomTextField } from "../../components/basic/basicComponents";
import img from '../../assets/loginPic.png'
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { GitHub, Google } from "@mui/icons-material";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center mt-64 md:mt-32 xl:mt-0">
            <div className="xl:px-28 py-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
                <div className="bg-[#D6EFFF] h-full xl:col-span-3 p-4 md:p-10 flex flex-col justify-center items-center pr-5">
                    <img src={img} alt="" className="w-4/5" />
                    <h1 className="text-center font-bold text-3xl md:text-4xl mb-6">NextGenNexus</h1>
                    <p className="text-xl text-center">Focuses on next-generation tech and a central place for tech enthusiasts.</p>
                </div>
                <div className="h-full bg-[#FED99B] p-4 md:p-10 xl:col-span-2">
                    <h1 className="text-center font-bold text-3xl md:text-4xl mb-6">NextGenNexus</h1>
                    <h3 className="text-center font-medium text-xl mb-4 tracking-widest">Welcome to NextGenNexus</h3>
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
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                    {...register('email')}
                                    style={{ marginTop: 15 }}
                                />
                                {
                                    errors.email && (<p className="text-red-500">{errors.email.message}</p>)
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
                                    errors.password && (<p className="text-red-500">{errors.password.message}</p>)
                                }
                                <div className="flex justify-end font-medium mt-3">
                                    <Link className="hover:underline">Forget Password</Link>
                                </div>
                                <CustomButton type="submit" style={{ marginTop: 15, fontSize: 20 }}>Submit</CustomButton>
                                <Divider style={{ marginTop: 20 }}>OR</Divider>
                                <div className="flex justify-evenly mt-8">
                                    <Button variant="outlined" style={{color: "black", borderColor: "black"}} startIcon={<Google />}>
                                        Google
                                    </Button>
                                    <Button variant="outlined" style={{color: "black", borderColor: "black"}} startIcon={<GitHub />}>
                                        GitHub
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;