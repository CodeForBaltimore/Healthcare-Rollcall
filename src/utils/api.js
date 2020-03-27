import axios from 'axios';

export const postLogin = (email, password) => {
    const fullUrl = new URL('/user/login', process.env.VUE_APP_BASE_API_URL);
    return axios.post(
        fullUrl.toString(),
        {
            email,
            password
        }
        ).then(response => response)
};
