import axios from "axios";

export const createUser = (data) => {
    axios.post('http://localhost:3000/createUsers', data)
        .then(res => {
            return res.data
        })
}