import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Carts from "../../components/cart/Carts";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const Products = () => {

    const { user } = useAuth();
    const [count, setCount] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    // const [sortValue, setSortValue] = useState("0");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/ProductsCount')
            .then(res => {
                setCount(res.data.count)
            })
    }, [])

    useEffect(() => {
        axiosPublic.get(`/productsPerPage?page=${currentPage}&size=${itemPerPage}`)
            .then(res => setProducts(res.data))
    }, [currentPage, itemPerPage, axiosPublic]);

    const numberOfPage = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPage).keys()];

    const searchValue = e => {
        const value = e.target.value;
        setSearch(value);
    }

    const handleItemsPerPage = e => {
        const number = e.target.value;
        setItemPerPage(number);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const searchProduct = () => {
        if (search.length > 0) {
            axiosPublic.get(`/searchProducts?productName=${search}`)
                .then(res => {
                    setCount(res.data.length);
                    setProducts(res.data);
                })
        }
    }

    return (
        <div className="mt-28 max-w-7xl lg:mx-auto md:mx-7">
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="flex justify-center">
                <div className="rounded-full border border-1 w-fit">
                    <div className="py-2 px-4 flex items-center gap-x-2">
                        <input type="search" name="search" onChange={searchValue} placeholder="Search Product" className="focus:outline-none font-montserrat text-lg" />
                        <IconButton aria-label="delete" onClick={searchProduct}>
                            <FiSearch />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
                {
                    products.map(product => <Carts
                        key={product._id}
                        product={product}
                        userEmail={user?.email}
                    ></Carts>)
                }
            </div>
            <div className="flex justify-center items-center gap-5 my-10 md:mt-20 flex-col md:flex-row">
                <div>
                    <button onClick={handlePrevPage} className="px-4 py-2 w-fit rounded-full hover:bg-[#FED18C] font-montserrat text-sm md:text-base">Prev</button>
                    <button onClick={handleNextPage} className="px-4 py-2 md:hidden ml-3 rounded-full hover:bg-[#FED18C] text-sm md:text-base w-fit">Next</button>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {
                        pages.map(page =>
                            <button
                                className={`px-4 py-2 rounded-full font-montserrat text-sm md:text-base ${currentPage === page ? 'bg-[#FE654F] px-4 py-2' : undefined}`}
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >{page + 1}</button>)
                    }
                </div>
                <button onClick={handleNextPage} className="px-4 py-2 rounded-full hover:bg-[#FED18C] text-sm md:text-base w-fit hidden md:flex">Next</button>
                <div className="border rounded-full border-black">
                    <div className="p-2">
                        <select value={itemPerPage} defaultValue={6} onChange={handleItemsPerPage} className="focus:outline-none w-full max-w-20 font-montserrat font-medium">
                            <option value="6">6</option>
                            <option value="9">9</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;