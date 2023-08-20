const express = require('express');

const axios = require('../config/axios');
const {AxiosInstance} = axios;

const router = express.Router();
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/client/chats/:unitId/brief', async (req, res) => {

    try {

        const unitId = req.params.unitId;

        const response = await AxiosInstance.get(`/client/chats/${unitId}/brief`, {
            headers: {
                Authorization: `${req.get('Authorization')}`,
            },
        });

        // Extract the JSON data from the response
        const data = response.data;

        // Send the JSON data back to the client
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/chats', async (req, res) => {

    try {
        const response = await AxiosInstance.get('/chats', {
            headers: {
                Authorization: `${req.get('Authorization')}`,
            },
        });

        // Extract the JSON data from the response
        const data = response.data;

        // Send the JSON data back to the client
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/chats/:chatId/send_message', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await AxiosInstance.post(`chats/${chatId}/send_message`, req, {
            headers: {
                Authorization: `${req.get('Authorization')}`,
                ContentType: 'application/json'
            },
        });

        // Extract the JSON data from the response
        const data = response.data;

        // Send the JSON data back to the client
        res.json(data);

    } catch (error) {
        console.error(error.errors);
        res.status(500).json({ error: '' });
    }
});

router.get('/short_messages', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await AxiosInstance.get(`short_messages`, {
            headers: {
                Authorization: `${req.get('Authorization')}`,
                ContentType: 'application/json'
            },
        });

        // Extract the JSON data from the response
        const data = response.data;

        // Send the JSON data back to the client
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/chats/:chatId', async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const response = await AxiosInstance.get(`chats/${chatId}`, {
            headers: {
                Authorization: `${req.get('Authorization')}`,
                ContentType: 'application/json'
            },
        });

        // Extract the JSON data from the response
        const data = response.data;

        // Send the JSON data back to the client
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;