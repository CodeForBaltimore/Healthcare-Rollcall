import axios from 'axios';

export const postLogin = (email, password) => {
    console.log(process.env.BASE_API_URL)
    const fullUrl = new URL('/user/login', process.env.BASE_API_URL);
    return axios.post(
        fullUrl.toString(),
        {
            email,
            password
        }
        ).then(response => response)
};
