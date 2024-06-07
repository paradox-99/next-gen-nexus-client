import axios from "axios";
import toast from "react-hot-toast";

let valid = false;

export const increaseUpvote = async (userEmail, vote, id, refetch) => {
    console.log(userEmail);
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
        await axios.post('http://localhost:3000/createUsersInteraction', info);
        await axios.patch(`http://localhost:3000/product/updateUpvote/${id}`, { updatedUpvote });
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
        await axios.post('http://localhost:3000/createUsersInteraction', info);
        await axios.patch(`http://localhost:3000/product/updateUpvote/${id}`, { updatedUpvote });
        refetch();
    }
}

const checkPrevious = async (id, email) => {
    await axios.get(`http://localhost:3000/reacts/checkPreviousReact?product_id=${id}&user_email=${email}`).then(res => {
        if (res.data.availability) {
            valid = true;
        }
        else valid = false;
    });
}

