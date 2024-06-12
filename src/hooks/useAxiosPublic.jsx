import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://next-gen-nexus.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;