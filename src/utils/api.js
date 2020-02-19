import axios from 'axios';

export const postLogin = (email, password) => {
    return axios.post(
        'localhost:5433/user/login',
        {
            email,
            password
        },
        ).then(response => response
    )
};
