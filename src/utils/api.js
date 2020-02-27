import axios from 'axios';

export const postLogin = (email, password) => {
    return axios.post(
        'http://localhost:5433/user/login',
        {
            email,
            password
        }
        ).then(response => response)
};
