import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ShowCoupons = () => {

    const axiosPublic = useAxiosPublic();

    const { data: coupons } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons');
            return res.data;
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 place-content-center place-items-center">
            {
                coupons && coupons.map((coupon, index) => (
                    <div key={index} className="bg-[#D6EFFF] p-4 rounded h-full" >
                        <h1 className="text-center font-pacifico text-7xl font-semibold mt-5 mb-10 text-[#FE654F]">{coupon.discount_amount}%</h1>
                        <h2 className="font-semibold text-2xl">Code: {coupon.coupon_code}</h2>
                        <p className="font-medium text-lg font-poppins my-3">Expiration date: {coupon.expiration_date}</p>
                        <p className="font-poppins font-medium">{coupon.coupon_description}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default ShowCoupons;