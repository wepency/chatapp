const path = require('path')
const http = require('http')
const express = require('express')
const mysql = require('mysql')
const socketIO = require('socket.io');

const formatMessage = require("./utils/messages");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatapp'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Close the MySQL connection when the server is stopped
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

// Set public path
app.use(express.static(path.join(__dirname, 'public')))

// Listen on user connects
io.on('connection', (socket) => {
    console.log('A client connected');

    socket.emit('message', 'welcome to chat')

    // Handle events from the client
    socket.on('chat message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
        io.emit('client disconnected', 'client disconnected');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, (req, res) => {
    console.log(`server running on port: ${PORT}`)
});
