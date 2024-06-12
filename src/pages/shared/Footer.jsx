import { SiGmail } from "react-icons/si";
import { FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="bg-[#000]">
                <div className="mt-14 max-w-7xl lg:mx-auto md:mx-7 py-14 space-y-7 md:space-y-4">
                    <div className="w-full flex flex-wrap gap-10 justify-center items-center text-xl md:text-2xl text-black">
                        <div className="bg-white p-2 md:p-3 rounded-full">
                            <FaFacebook />
                        </div>
                        <div className="bg-white p-2 md:p-3 rounded-full">
                            <FaXTwitter />
                        </div>
                        <div className="bg-white p-2 md:p-3 rounded-full">
                            <FaYoutube />
                        </div>
                        <div className="bg-white p-2 md:p-3 rounded-full">
                            <SiGmail />
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-5 md:gap-10 justify-center items-center text-lg md:text-xl text-white font-montserrat">
                        <Link className="hover:underline">Home</Link>
                        <Link className="hover:underline">Products</Link>
                        <Link className="hover:underline">About Us</Link>
                        <Link className="hover:underline">News</Link>
                        <Link className="hover:underline">Contact us</Link>
                        <Link className="hover:underline">Our Team</Link>
                    </div>
                </div>
            </div>
            <div className="bg-[#272727]">
                <div className="max-w-7xl lg:mx-auto md:mx-7 py-5 text-white font-poppins text-center text-lg">
                    <p>Copyright &copy; 2024 - All right reserved by NextGenNexus Ltd</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;