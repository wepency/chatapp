import { useState } from 'react';
import './App.css';
import io, { Socket } from "socket.io-client"
import ChatPage from './ChatPage';
import ChatList from './ChatList';
import AdminChat from './AdminChat';
import ShortMessages from './Pages/ShortMessages';

import {BASE_URL, APP_MAIN_PATH} from './config'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const socket = io.connect(BASE_URL);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div style={{direction:'rtl'}} className="App">

      <BrowserRouter>
        <main>
          <Routes>
            <Route path={`${APP_MAIN_PATH}/`} element={<ChatList socket={socket} />} />
            <Route path={`${APP_MAIN_PATH}/chats/:chatId`} element={<ChatPage socket={socket} />} />
            <Route path={`${APP_MAIN_PATH}/short_messages`} element={<ShortMessages socket={socket} />} />
            <Route path={`${APP_MAIN_PATH}/admin-chat`} element={<AdminChat />} />
          </Routes>
        </main>
      </BrowserRouter>
      
    </div>
  );
}

export default App;