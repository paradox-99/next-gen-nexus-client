import { Card, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { SlDislike, SlLike } from "react-icons/sl";
import { decreaseUpvote, increaseUpvote } from '../functions/func';
import { Link } from 'react-router-dom';

const Carts = ({ product, userEmail, refetch }) => {

    const [isDisable, setDisable] = useState(false);

    useEffect(() => {
        if (userEmail === product.product_owner_info.owner_email) {
            setDisable(true);
        }
    }, []);

    return (
        <div>
            <Card sx={{ maxWidth: 410, height: "100%" }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={product?.product_image}
                    title={product?.product_name}
                />
                <div className='bg-white'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Link to={`/viewDetails/${product._id}`} className='font-semibold hover:underline'>{product?.product_name}</Link>
                        </Typography>
                        <div className='flex flex-wrap gap-1 items-center mt-2'>
                            <p className='font-poppins'>Tags: </p>
                            {
                                product.tags.map((tag, idx) => <Chip key={idx} label={tag} variant="outlined" style={{ background: 'white' }} />)
                            }
                        </div>
                        <div className='flex gap-1 items-center mt-5'>
                            <IconButton id='upvote' onClick={() => increaseUpvote(userEmail, product.upvote_count, product._id, refetch)} disabled={isDisable}>
                                <SlLike className='text-[#FE654F]' id='upvoteIcon' />
                            </IconButton>
                            <IconButton id='upvote' onClick={() => decreaseUpvote(userEmail, product.upvote_count, product._id, refetch)} disabled={isDisable}>
                                <SlDislike className='text-[#FE654F]' id='upvoteIcon' />
                            </IconButton>
                            <p className='p-2 outline outline-1 rounded-full font-poppins'>{product.upvote_count}</p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

Carts.propTypes = {
    product: PropTypes.object.isRequired,
    userEmail: PropTypes.string,
    refetch: PropTypes.func
}

export default Carts;