import axios from "axios"

const url = "http://localhost:3000/"

export const getOneUser = async (email, password) => {
    try {
        const {data} = await axios.get(`${url}users?email=${email}&password=${password}`)
        return data.length ? data[0] : null;
    } catch (error) {
        console.log(error);
        return null
    }
   
}

export const saveUser = async (user) => {
    try {
        const {data} = await axios.post(`${url}users`, {...user})
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
   
}