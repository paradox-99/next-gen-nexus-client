import axios from "axios";
import toast from "react-hot-toast";

export const increaseUpvote = async (userEmail, vote, id, refetch) => {
    if (!userEmail) {
        toast.error("Please login first", {
            position: "top-center",
            duration: 2500,
        });
        return
    }
    let updatedUpvote = vote + 1;
    await axios.patch(`http://localhost:3000/product/updateUpvote/${id}`, { updatedUpvote });
    refetch();
}

export const decreaseUpvote = async (userEmail, vote, id, refetch) => {
    if (!userEmail) {
        toast.error("Please login first", {
            position: "top-center",
            duration: 2500,
        });
        return
    }
    let updatedUpvote = vote - 1;
    await axios.patch(`http://localhost:3000/product/updateUpvote/${id}`, { updatedUpvote });
    refetch();
}