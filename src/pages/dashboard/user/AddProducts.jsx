import { Box, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomButton, CustomTextField } from "../../../components/basic/basicComponents";
import useAuth from "../../../hooks/useAuth";
import { CloudUpload } from "@mui/icons-material";

const AddProducts = () => {

    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const product_name = data.productName;
        const owner_name = user.displayName;
        const owner_image = user.photoURL;
        const owner_email = user.email;
        const product_image = data.picture;
        const description = data.description;
        const external_links = data.links;
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input type="file" name="" id="" className=" text-xl"/>
                        
                    </div>
                    <div className="flex flex-col items-end justify-between lg:flex-row gap-6 lg:gap-14">
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
                    </div>
                    <div className="flex flex-col items-end justify-between lg:flex-row gap-6 lg:gap-14">
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
                        <CustomButton type="submit">Add</CustomButton>
                    </div>
                </Box>
            </form>
        </div>
    );
};

export default AddProducts;