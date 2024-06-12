import { Chip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Rating, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { decreaseUpvote, increaseUpvote } from "../../components/functions/func";
import { MdReportGmailerrorred } from "react-icons/md";
import ReviewCarts from "../../components/cart/ReviewCarts";
import { CustomButton, CustomTextField } from "../../components/basic/basicComponents";
import { Star } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Details = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()
    const [isDisable, setDisable] = useState(false);
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const { refetch, data } = useQuery({
        queryKey: ['details', `${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`)
            return res.data;
        }
    })

    console.log(data);

    useEffect(() => {
        if (user?.email === data?.product_owner_info?.owner_email) {
            setDisable(true);
        }
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uploadReview = async (info) => {
        await axiosPublic.post('/postReview', info)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Review provided successfully', {
                        position: "top-center",
                        duration: 2000,
                    })
                }
            })
    }

    const sendReport = async (id) => {
        await axiosPublic.patch(`/reportProduct/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Report sent successfully', {
                        position: "top-center",
                        duration: 2000,
                    })
                }
            })
    }

    return (
        <div className="mt-24 max-w-7xl lg:mx-auto mx-5 md:mx-7">
            <Helmet>
                <title>Product Details</title>
            </Helmet>

            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">Product Details</h1>
                <div className="mt-10 flex gap-5 flex-col lg:flex-row mb-10">
                    <div className="lg:w-3/4">
                        <figure>
                            <img src={data?.product_image} alt={data?.product_name} className="w-full" />
                        </figure>
                        <div className="mt-8">
                            <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold">{data?.product_name}</h1>
                                    <h3 className="text-xl font-semibold mt-3">Product Link:</h3>
                                </div>
                                <div className="flex md:block items-center w-full md:w-fit justify-between gap-3">
                                    <div className='flex gap-1 items-center'>
                                        <IconButton id='upvote' onClick={() => increaseUpvote(user?.email, data?.upvote_count, data?._id, refetch)} disabled={isDisable}>
                                            <SlLike className='text-[#FE654F]' id='upvoteIcon' />
                                        </IconButton>
                                        <IconButton id='upvote' onClick={() => decreaseUpvote(user?.email, data?.upvote_count, data?._id, refetch)} disabled={isDisable}>
                                            <SlDislike className='text-[#FE654F]' id='upvoteIcon' />
                                        </IconButton>
                                        <p className='p-2 bg-[#FED99B] rounded-lg font-poppins'>{data?.upvote_count}</p>
                                    </div>
                                    <div className="bg-gray-300 md:mt-1 rounded-full">
                                        <div className="justify-center  flex items-center px-3 w-fit">
                                            <IconButton onClick={() => sendReport(data._id)}><MdReportGmailerrorred className="text-xl text-red-500" /></IconButton>
                                            <p className="font-poppins text-base md:text-lg text-red-500">Report</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-disc ml-7">
                                <li>{data?.external_links[0]}</li>
                                <li>{data?.external_links[1]}</li>
                            </ul>
                            <div className='flex flex-wrap gap-1 items-center mt-5'>
                                <p className='font-poppins text-lg'>Tags: </p>
                                {
                                    data?.tags?.map((tag, idx) => <Chip key={idx} label={tag} variant="outlined" style={{ background: '#FED99B' }} />)
                                }
                            </div>
                            <div className="bg-[#D6EFFF] p-5 mt-6 rounded-lg font-poppins text-justify">
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 bg-[#D6EFFF]">
                        <div className="p-4">
                            <h1 className="tracking-wider text-center text-3xl font-semibold ">Reviews</h1>
                            <div className="mt-5">
                                <ReviewCarts product_id={data?._id}></ReviewCarts>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-5">
                    <CustomButton onClick={handleClickOpen}>
                        Review Product
                    </CustomButton>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const product_id = data._id;
                        const rating = formJson.rating;
                        const reviewer_image = user.photoURL;
                        const reviewer_name = user.displayName;
                        const description = formJson.description;

                        const date = new Date();
                        const review_date = date.toLocaleDateString();

                        const info = { product_id, reviewer_name, reviewer_image, description, rating, review_date };
                        await uploadReview(info);
                        refetch();
                        handleClose();
                        setTimeout(location.reload(), 2000);
                    },
                }}
            >
                <DialogTitle style={{ fontWeight: 600, fontSize: 25 }}>Give Product Review</DialogTitle>
                <DialogContent>
                    <div className="space-x-5">
                        <CustomTextField
                            autoFocus
                            required
                            defaultValue={user?.displayName}
                            margin="dense"
                            label="Name"
                            variant="standard"
                            disabled
                        />
                        <CustomTextField
                            autoFocus
                            required
                            defaultValue={user?.photoURL}
                            margin="dense"
                            label="Image"
                            variant="standard"
                            disabled
                        />
                    </div>
                    <div>
                        <CustomTextField
                            autoFocus
                            required
                            name="description"
                            margin="dense"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </div>
                    <div>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 2
                            }}
                        >
                            <h3 className="font-semibold text-xl mr-3 ">Rating</h3>
                            <Rating
                                value={value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                name="rating"
                                emptyIcon={<Star style={{ opacity: 0.55, }} fontSize="inherit" />}
                            />
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleClose}>Cancel</CustomButton>
                    <CustomButton type="submit">Submit</CustomButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Details;