import { useLoaderData } from "react-router-dom";

const Details = () => {

    const product = useLoaderData();

    return (
        <div className="mt-24 max-w-7xl lg:mx-auto mx-5 md:mx-7">
            <div>
                <h1 className="text-5xl text-center font-bold">Product Details</h1>
                <div>
                    <figure>
                        <img src={product.data.product_image} alt={product.data.product_name} className="lg:w-3/4" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default Details;