import { Star } from '@mui/icons-material';
import { Box, Divider, Rating } from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import React from 'react';

const ReviewCart = ({ review }) => {
    return (
        <div className='bg-white rounded'>
            <div className='p-3'>
                <div className='flex gap-5 items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                        <img src={review?.reviewer_image} alt={review?.reviewer_name} className='w-10 h-10 rounded-full' />
                        <h3 className='font-semibold'>{review?.reviewer_name}</h3>
                    </div>
                    <div>
                        <Rating
                            name="hover-feedback"
                            value={review?.rating}
                            precision={0.5}
                            readOnly
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </div>
                </div>
                <Divider/>
                <div>
                    <p>{review?.description}</p>
                </div>
            </div>
        </div>
    );
};

ReviewCart.propTypes = {
    review: PropTypes.object
}

export default ReviewCart;