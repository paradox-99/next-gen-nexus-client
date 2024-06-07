import { Box, Button, ThemeProvider, createTheme, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomButton, CustomTextField } from "../../../components/basic/basicComponents";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import { TagsInput } from "react-tag-input-component";
import './styles.css'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import toast from "react-hot-toast";

const upload_url = `https://api.imgbb.com/1/upload?key=cab06b1596f541fb90cf941719f5f573`

const poppinsFont = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});

const AddProducts = () => {

    const { user } = useAuth();
    const [selected, setSelected] = useState([]);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data);
        const product_name = data.productName;
        const owner_name = user?.displayName;
        const owner_image = user?.photoURL;
        const owner_email = user?.email;
        const description = data.description;
        const external_links = Array(data.links);
        const tags = selected;
        const imageFile = { image: data.picture[0] }

        const res = await axiosPublic.post(upload_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const product_image = res.data.data.display_url;
        const date = new Date();
        const creation_time = date.toLocaleString();

        const info = { product_name, product_image, external_links, product_owner_info: { owner_name, owner_email, owner_image }, description, tags, creation_time }

        axiosPublic.post('/addNewProduct', info)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Product added successfully.');
                }
            })
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className="px-20 py-14 w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-montserrat font-semibold">Add Products</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <ThemeProvider theme={poppinsFont}>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 'full' },
                        }}

                    >
                        <div className="flex flex-col items-end justify-between lg:flex-row gap-6 lg:gap-14">
                            <CustomTextField
                                required
                                fullWidth
                                label="Name"
                                type="text"
                                variant="standard"
                                {...register('productName')}
                                style={{ marginTop: 15 }}
                            />
                            <CustomTextField
                                required
                                label="Owner name"
                                type="text"
                                fullWidth
                                disabled
                                defaultValue={user?.displayName}
                                variant="standard"
                                {...register('ownerName')}
                                style={{ marginTop: 15 }}
                            />

                        </div>
                        <div className="flex flex-col items-end justify-between lg:flex-row gap-6 lg:gap-14">
                            <CustomTextField
                                required
                                label="Owner Email"
                                type="email"
                                fullWidth
                                disabled
                                defaultValue={user?.email}
                                variant="standard"
                                {...register('ownerEmail')}
                                style={{ marginTop: 15 }}
                            />
                            <CustomTextField
                                required
                                label="Owner Image"
                                type="url"
                                fullWidth
                                disabled
                                defaultValue={user?.photoURL}
                                variant="standard"
                                {...register('ownerImage')}
                                style={{ marginTop: 15 }}
                            />
                        </div>
                        <div className="flex flex-col items-end justify-between lg:flex-row gap-6 lg:gap-14">
                            <CustomTextField
                                required
                                label="External Links"
                                type="url"
                                fullWidth
                                variant="standard"
                                {...register('links')}
                                style={{ marginTop: 15 }}
                            />
                        </div>
                        <div className="mx-2 mt-6">
                            <TagsInput
                                value={selected}
                                onChange={setSelected}
                                name="tags"
                                placeHolder="Enter tags"
                            />
                        </div>
                        <div className="my-7 mx-2">
                            <span className="text-lg font-medium font-montserrat mr-3">Upload Product Image:</span>
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                style={{ color: "black", borderColor: "black" }}
                                tabIndex={-1}
                                startIcon={<CloudUpload />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" {...register('picture')} />
                            </Button>
                        </div>
                        <div>
                            <CustomTextField
                                label="Description"
                                rows={5}
                                fullWidth
                                {...register('description')}
                                multiline
                                type="text"
                                variant='standard'
                            />
                        </div>
                        <div className="flex justify-center mt-5">
                            <CustomButton type="submit">{isSubmitting ? 'Submitting' : 'Add'}</CustomButton>
                        </div>
                    </Box>
                </ThemeProvider>
            </form>
        </div>
    );
};

export default AddProducts;