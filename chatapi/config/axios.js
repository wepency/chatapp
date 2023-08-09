const axios = require('axios')

const config = require('../config');
const {server_api} = config;

const AxiosInstance = axios.create({
    baseURL: server_api
});

module.exports = {
    AxiosInstance
};