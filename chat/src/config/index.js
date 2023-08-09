import axios from "axios";

const isLocalHost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.match(
        /^(localhost|127\.0\.0\.1|::1)$/i
    )
);

export const BASE_URL = isLocalHost
? "http://localhost:3001"
: "https://aqarbooking.com";

export const APP_MAIN_PATH = isLocalHost
? ""
: "/chat";

const API_URL = isLocalHost
? "http://localhost:3001/api"
: "https://aqarbooking.com/api";

export const Axios = axios.create({
    // withCredentials: true,
    baseURL: API_URL
});

export const AxiosClear = axios.CancelToken.source()