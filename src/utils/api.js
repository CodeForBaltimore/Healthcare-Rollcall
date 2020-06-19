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

export const postReset = (email) => {
    const fullUrl = new URL('/user/reset/' + email, process.env.VUE_APP_BASE_API_URL);
    return axios.post(fullUrl.toString(),
        {
            email
        }).then(response => response)
};

export const updateUser = (email_token, email, password) => {
    const fullUrl = new URL('/user', process.env.VUE_APP_BASE_API_URL);
    return axios.put(fullUrl.toString(),
        {
            email,
            password,
        },
        {
            headers: {
                'token': email_token
            }
        }
    ).then(response => response);
}
