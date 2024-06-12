import axios from "axios";

export const createUser = (data) => {
    axios.post('https://next-gen-nexus.vercel.app/createUsers', data)
        .then(res => {
            return res.data
        })
}