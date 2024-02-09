import axios, { AxiosError, AxiosResponse } from 'axios';

const successResponse = (response: AxiosResponse) => response; // response.data
const errorResponse = (error: AxiosError) => {
    if (!error.response) {
        console.debug('Axios error interceptor', { error });
    }

    return Promise.reject(error.response?.data);
};

axios.interceptors.response.use(successResponse, errorResponse);

export default axios;