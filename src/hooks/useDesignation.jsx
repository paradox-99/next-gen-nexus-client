import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDesignation = () => {

    const {user, status} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: designation, isPending: isDesignation } = useQuery({
        queryKey: [user?.email, 'designation'],
        enabled: !status,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/checkDesignation/${user.email}`);
            return res.data?.designation;
        }
    })

    return [designation, isDesignation]
};


export default useDesignation;