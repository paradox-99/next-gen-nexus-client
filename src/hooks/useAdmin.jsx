import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {

    const {user, status} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !status,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/checkAdmin/${user.email}`);
            return res.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;