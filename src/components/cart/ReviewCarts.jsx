import useReviews from "../functions/useReviews";
import PropTypes from 'prop-types';
import ReviewCart from "./ReviewCart";

const ReviewCarts = ({ product_id }) => {

    const reviews = useReviews({ product_id });

    return (
        <div className="space-y-2">
            {
                reviews?.map(review => <ReviewCart
                    key={review._id}
                    review={review}
                ></ReviewCart>)
            }
        </div>
    );
};

ReviewCarts.propTypes = {
    product_id: PropTypes.string
}

export default ReviewCarts;