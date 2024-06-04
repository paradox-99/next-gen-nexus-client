import { Chip, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { decreaseUpvote, increaseUpvote } from "../../components/functions/func";
import { MdReportGmailerrorred } from "react-icons/md";
import ReviewCarts from "../../components/cart/ReviewCarts";

const Details = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()
    const [isDisable, setDisable] = useState(false);

    const { refetch, data } = useQuery({
        queryKey: ['details', `${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`)
            return res.data;
        }
    })

    useEffect(() => {
        if (user?.email === data?.product_owner_info.owner_email) {
            setDisable(true);
        }
    }, [])

    return (
        <div className="mt-24 max-w-7xl lg:mx-auto mx-5 md:mx-7">
            <div>
                <h1 className="text-5xl text-center font-bold">Product Details</h1>
                <div className="mt-10 flex gap-5">
                    <div className="w-3/4">
                        <figure>
                            <img src={data?.product_image} alt={data?.product_name} className="w-full" />
                        </figure>
                        <div className="mt-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-4xl font-bold">{data?.product_name}</h1>
                                    <h3 className="text-xl font-semibold mt-3">Product Link:</h3>
                                </div>
                                <div>
                                    <div className='flex gap-1 items-center'>
                                        <IconButton id='upvote' onClick={() => increaseUpvote(user?.email, data?.upvote_count, data?._id, refetch)} disabled={isDisable}>
                                            <SlLike className='text-[#FE654F]' id='upvoteIcon' />
                                        </IconButton>
                                        <IconButton id='upvote' onClick={() => decreaseUpvote(user?.email, data?.upvote_count, data?._id, refetch)} disabled={isDisable}>
                                            <SlDislike className='text-[#FE654F]' id='upvoteIcon' />
                                        </IconButton>
                                        <p className='p-2 bg-[#FED99B] rounded-lg font-poppins'>{data?.upvote_count}</p>
                                    </div>
                                    <div className="bg-gray-300 justify-center mt-1 rounded-full flex items-center">
                                        <IconButton><MdReportGmailerrorred className="text-xl text-red-500" /></IconButton>
                                        <p className="font-poppins text-lg text-red-500">Report</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-disc ml-7">
                                <li>{data?.external_links[0]}</li>
                                <li>{data?.external_links[1]}</li>
                            </ul>
                            <div className='flex gap-1 items-center mt-5'>
                                <p className='font-poppins text-lg'>Tags: </p>
                                {
                                    data?.tags.map((tag, idx) => <Chip key={idx} label={tag} variant="outlined" style={{ background: '#FED99B' }} />)
                                }
                            </div>
                            <div className="bg-[#D6EFFF] p-5 mt-6 rounded-lg font-poppins mb-10 text-justify">
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 bg-[#D6EFFF]">
                        <div className="p-4">
                            <h1 className="tracking-wider text-center text-3xl font-semibold ">Reviews</h1>
                            <div className="mt-5">
                                <ReviewCarts product_id={data?._id}></ReviewCarts>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;