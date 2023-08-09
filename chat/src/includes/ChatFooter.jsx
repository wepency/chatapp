import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import {Axios} from '../config';

export default function ChatFooter({ socket, messageList, setMessageList, isTyping, setIsTyping, handleTyping, isOtherUserTyping, setIsOtherUserTyping, token }) {

  const [currentMessage, setCurentMessage] = useState("");
  const {chatId} = useParams();

  const handleKeyPress = async (event) => {

    if(event.keyCode === 13 || event.key === 'Enter') {
      
        if(currentMessage !== "") {
          const messageData = {
            message: currentMessage,
            room: chatId,
            isMe: true,
            receiverId: 8,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
          }
  
          await socket.emit("send_message", messageData);
          
          setMessageList((list) => [...list, messageData])

          Axios.post('chats/'+chatId+'/send_message', messageData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          })

          setCurentMessage('');
      }

    }

  }

  return (
    <div className="input">

      <input 
      
        placeholder="Type your message here!" 

        value={currentMessage}

        onChange={(event) => {
          setCurentMessage(event.target.value);
          handleTyping(event);
          // Add more method calls as needed
        }}

        onBlur={() => {
          setIsTyping(false);
          socket.emit('typing', false, chatId);
        }}

        onKeyDown={handleKeyPress} type="text" 
      />

    </div>
  )
}