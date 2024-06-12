import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import FeaturedCart from '../../components/cart/FeaturedCart';
import useAuth from '../../hooks/useAuth';
import Carts from '../../components/cart/Carts';
import { CustomButton } from '../../components/basic/basicComponents';
import Title from '../shared/Title';
import ShowCoupons from './ShowCoupons';

const Homepage = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { refetch, data: products } = useQuery({
        queryKey: ['featuredProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products?status=featured');
            return res.data;
        }
    })

    return (
        <div className="">
            {/* banner */}
            <div className="bg-banner bg-center w-full h-screen bg-cover bg-no-repeat flex flex-col justify-center items-center">
                <div className='flex flex-col md:flex-row w-full justify-between items-center pt-10 lg:pl-10'>
                    <h1 className='text-3xl lg:text-7xl font-bold tracking-widest text-white text-center leading-relaxed font-montserrat pt-6'>Discover <br /> the Latest in <br /> Tech Innovation.</h1>
                    <div className='md:w-96 lg:mr-20'>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="w-60 lg:w-80"
                        >
                            <SwiperSlide className='rounded-xl'>
                                <div className='bg-[#FED18C] h-60 lg:h-72 flex flex-col justify-center items-center'>
                                    <Button variant="contained" href='/products'
                                        style={{
                                            background: '#D6EFFF',
                                            color: 'black',
                                            '@media (maxWidth: 600px)': {
                                                fontSize: 20,
                                            },
                                            '@media (maxWidth: 350px)': {
                                                fontSize: 16,
                                            },
                                        }}> Explore</Button>
                                    <p className='text-center p-5 text-base md:text-xl font-poppins'>Find the newest apps, tools, and gadgets</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='rounded-xl'>
                                <div className='bg-[#FE654F] h-60 lg:h-72 flex flex-col justify-center items-center'>
                                    <Button variant="contained" href='/products'
                                        style={{
                                            background: '#D6EFFF',
                                            color: 'black',
                                            '@media (maxWidth: 600px)': {
                                                fontSize: 20,
                                            },
                                            '@media (maxWidth: 350px)': {
                                                fontSize: 16,
                                            },
                                        }}> Upvote</Button>
                                    <p className='text-center p-5 text-base md:text-xl font-poppins'>Help highlight the best products</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='rounded-xl'>
                                <div className='bg-[#FED99B] h-60 lg:h-72 flex flex-col justify-center items-center'>
                                    <Button variant="contained" href='/products'
                                        style={{
                                            background: '#D6EFFF',
                                            color: 'black',
                                            '@media (maxWidth: 600px)': {
                                                fontSize: 20,
                                            },
                                            '@media (maxWidth: 350px)': {
                                                fontSize: 16,
                                            },
                                        }}> Review</Button>
                                    <p className='text-center p-5 text-base md:text-xl font-poppins'>Share your thoughts and read others insights</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <Link to={'/signin'} className='bg-[#FE654F] p-3 md:p-4 lg:p-5 w-36 text-center mt-10 font-montserrat text-xl font-semibold hover:border-b-4 hover:bg-[#FED99B] rounded-t-md hover:border-black'>Join Now</Link>
            </div>
            <div className="mt-24 max-w-7xl lg:mx-auto md:mx-7">
                <Title title={"Featured Products"}></Title>
                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {
                        products?.featuredProducts?.map((product) => <FeaturedCart
                            key={product._id}
                            product={product}
                            userEmail={user?.email}
                            refetch={refetch}
                        ></FeaturedCart>
                        )}
                </div>
            </div>
            <div className="mt-24 max-w-7xl lg:mx-auto md:mx-7">
                <Title title={"Treading Products"}></Title>
                <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-content-center place-items-center h-full'>
                    {
                        products?.trendingProducts?.map((product) => <Carts
                            key={product._id}
                            product={product}
                            userEmail={user?.email}
                            refetch={refetch}
                        ></Carts>
                        )}
                </div>
                <div className='my-10 text-center'>
                    <CustomButton href='/products'>Show all Products</CustomButton>
                </div>
            </div>
            <div className="mt-24 max-w-7xl lg:mx-auto md:mx-7 ">
                <Title title={"Get Discounts"}></Title>
                <ShowCoupons></ShowCoupons>
            </div>
        </div>
    );
};

export default Homepage;