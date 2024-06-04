import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropTypes from 'prop-types';

const useReviews = ({product_id}) => {

    // console.log(product_id);
    const axiosPublic = useAxiosPublic();

    const { data } = useQuery({
        queryKey: ['review', `${product_id}`],
        queryFn: async() => {
            const res = await axiosPublic.get(`/reviews/${product_id}`);
            return res.data;
        }
    })
    return data;
};

useReviews.propTypes = {
    id: PropTypes.string
}

export default useReviews;