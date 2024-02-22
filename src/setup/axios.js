import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true; // config axios : mỗi khi gửi req lên server nodejs sẽ luôn mặc định đính kèm cookie

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error

        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status =
            (error && error.response && error.response.status) || 500;

        switch (status) {
            case 401: {
                toast.error("unauthorize");
                // window.location.href = "/login";
                // return Promise.reject(error);
                return;
            }
            case 403: {
                toast.error(
                    "you don't have permission to access this resource"
                );
                return;
            }

            case 400: {
                toast.error("Error 400");
                return;
            }

            case 404: {
                toast.error("Error 404");

                return;
            }
            case 409: {
                toast.error("Error 409");

                return;
            }
            case 422: {
                toast.error("Error 422");

                return;
            }
            default: {
                return;
            }
        }
    }
);

export default instance;
