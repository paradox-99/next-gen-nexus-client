import { Chip, IconButton} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { SlDislike, SlLike } from "react-icons/sl";
import { decreaseUpvote, increaseUpvote } from '../functions/func';
import { Link } from 'react-router-dom';

const FeaturedCart = ({ product, userEmail, refetch }) => {

    const [isDisable, setDisable] = useState(false);

    useEffect(() => {
        if (userEmail === product.product_owner_info.owner_email) {
            setDisable(true);
        }
    }, [])

    

    return (
        <div className='bg-[#D6EFFF] rounded-lg'>
            <div className='p-4 flex flex-col md:flex-row gap-5'>
                <div>
                    <figure>
                        <img src={product.product_image} alt={product.product_name} className=' md:w-48 md:h-32' />
                    </figure>
                </div>
                <div>
                    <Link to={`/viewDetails/${product._id}`} className='text-2xl font-semibold hover:underline'>{product.product_name}</Link>
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
                        <p className='p-2 bg-white rounded-full font-poppins'>{product.upvote_count}</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

FeaturedCart.propTypes = {
    product: PropTypes.object.isRequired,
    userEmail: PropTypes.string,
    refetch: PropTypes.func
}

export default FeaturedCart;