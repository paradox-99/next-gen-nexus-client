import axios from "axios";
import toast from "react-hot-toast";

let valid = false;

export const increaseUpvote = async (userEmail, vote, id, refetch) => {
    if (!userEmail) {
        toast.error("Please login first", {
            position: "top-center",
            duration: 2500,
        });
        return
    }
    await checkPrevious(id, userEmail);
    if (!valid) {
        let updatedUpvote = vote + 1;
        const info = {product_id: id, user_email: userEmail, vote_type: "upvote"}
        await axios.post('https://next-gen-nexus.vercel.app/createUsersInteraction', info);
        await axios.patch(`https://next-gen-nexus.vercel.app/product/updateUpvote/${id}`, { updatedUpvote });
        refetch();
    }
}

export const decreaseUpvote = async (userEmail, vote, id, refetch) => {
    if (!userEmail) {
        toast.error("Please login first", {
            position: "top-center",
            duration: 2500,
        });
        return
    }
    await checkPrevious(id, userEmail);
    if (!valid) {
        let updatedUpvote = vote - 1;
        const info = {product_id: id, user_email: userEmail, vote_type: "downvote"}
        await axios.post('https://next-gen-nexus.vercel.app/createUsersInteraction', info);
        await axios.patch(`https://next-gen-nexus.vercel.app/product/updateUpvote/${id}`, { updatedUpvote });
        refetch();
    }
}

const checkPrevious = async (id, email) => {
    await axios.get(`https://next-gen-nexus.vercel.app/reacts/checkPreviousReact?product_id=${id}&user_email=${email}`).then(res => {
        if (res.data.availability) {
            valid = true;
        }
        else valid = false;
    });
}

