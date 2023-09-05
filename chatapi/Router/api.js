const express = require('express');

const axios = require('../config/axios');
const {AxiosInstance} = axios;

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

// Define a common error handling function
const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({error: 'Server has an error'})
};

const axiosWithAuth = (req) => {
    return AxiosInstance({
        headers: {
            Authorization: req.get('Authorization'),
            'Content-type': 'application/json'
        }
    })
}

// Route for getting Chat Breif
router.get('/client/chats/:unitId/brief', async (req, res) => {

    try {

        const unitId = req.params.unitId;
        const response = await axiosWithAuth.get(`/client/chats/${unitId}/brief`);

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error);
    }
});

// Route for getting all chats
router.get('/chats', async (req, res) => {

    try {
        const response = await axiosWithAuth.get('/chats');

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error)
    }
});

router.post('/chats', async (req, res) => {

    try {
        const response = await axiosWithAuth.post(`/chats?receiver_id=${req.query.receiver_id}`);

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error);
    }
});

router.post('/chats/:chatId/send_message', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await AxiosInstance.post(`chats/${chatId}/send_message`, req);

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error);
    }
});

router.get('/short_messages', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await axiosWithAuth.get(`short_messages`);

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error);
    }
});

router.get('/chats/:chatId', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await axiosWithAuth.get(`chats/${chatId}`);

        // Send the JSON data back to the client
        res.json(response.data);

    } catch (error) {
        handleServerError(res, error);
    }
});

module.exports = router;