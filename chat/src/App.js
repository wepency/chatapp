import { useState } from 'react';
import './App.css';
import io, { Socket } from "socket.io-client"
import ChatPage from './ChatPage';
import ChatList from './ChatList';
import AdminChat from './AdminChat';
import {BASE_URL, APP_MAIN_PATH} from './config'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// const socket = io.connect("https://aqarbooking.com");
// const socket = io.connect("http://localhost:3001");
const socket = io.connect(BASE_URL);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  // const joinRoom = () => {

  //   if(username !== "" && room !== "") {
  //     socket.emit("join_room", room)
  //   }
  // }

  return (
    <div className="App">

      {/* <h3>Join A Chat</h3>

      <input 
      type='text'
      placeholder='jhon..'
      onChange={(event) => {
        setUsername(event.target.value)
      }}
      />

      <input
      type='text'
      placeholder='Room ID ...'
      onChange={(event) => {
        setRoom(event.target.value);
      }}

      />

      <button onClick={joinRoom}>Join chat</button> */}


      {/* <Chat socket={socket} username={username} room={room} /> */}

      {/* <ChatPage /> */}
      {/* <ChatList /> */}

      <BrowserRouter>
        <main>
          <Routes>
            <Route path={`${APP_MAIN_PATH}/`} element={<ChatList socket={socket} />} />
            <Route path={`${APP_MAIN_PATH}/chats/:chatId`} element={<ChatPage socket={socket} />} />
            <Route path={`${APP_MAIN_PATH}/admin-chat`} element={<AdminChat />} />
          </Routes>
        </main>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
