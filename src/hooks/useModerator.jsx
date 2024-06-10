import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {

    const {user, status} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, 'isModerator'],
        enabled: !status,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/checkModerator/${user.email}`);
            return res.data?.moderator;
        }
    })

    return [isModerator, isModeratorLoading]
};

export default useModerator;