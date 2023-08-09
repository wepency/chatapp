import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./includes/ChatHeader";
import ChatBody from "./includes/ChatBody";
import ChatShortMessages from "./includes/ChatShortMessages";
import ChatFooter from "./includes/ChatFooter";
import { useParams, useSearchParams } from 'react-router-dom';
import {Axios} from "./config";
import AxiosInstance from "axios";

const ChatPage = React.memo(({ socket }) => {

  const {chatId} = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [messageList, setMessageList] = useState([])
  const [userData, setUserData] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  const [shortMessage, setShortMessage] = useState('');

  const handleTyping = () => {
    setIsTyping(true);
    // Emit 'typing' event to the Socket.io server
    socket.emit('typing', true, chatId);
  };

  const bearerToken = searchParams.get('token');

  useEffect(() => {
    // Join the room when the component mounts
    socket.emit('join_room', chatId);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  // Get user chat from the API
  useEffect(() => {
    let unmounted = false;
    let source = AxiosInstance.CancelToken.source();

    Axios.get('chats/' + chatId, {
      headers: {
        Authorization: `Bearer ${bearerToken}`, // Attach the bearer token in the request headers
      },
    })
    .then((response) => {
      
      setUserData(response.data.data.user);

      const transformedData = response.data.data.messages.map((message) => {
        return {
          message: message.message,
          room: message.chat_id,
          time: message.sent_at,
          date: message.date,
          isMe: message.is_me,
          id: message.id,
        };
      });

      setMessageList(transformedData);
    })


    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
  };

  }, [bearerToken])
  
  return(
    <div className="center">
      <div className="chat">

        <ChatHeader userData={userData} token={bearerToken} />

        <ChatBody socket={socket} 
          messageList={messageList} 
          setMessageList={setMessageList} 
          isTyping={isTyping} 
          setIsTyping={setIsTyping} 
          handleTyping={handleTyping} 
          isOtherUserTyping={isOtherUserTyping} 
          setIsOtherUserTyping={setIsOtherUserTyping} 
        />

        <ChatShortMessages token={bearerToken} />

        <ChatFooter socket={socket} 
          messageList={messageList} 
          setMessageList={setMessageList} 
          isTyping={isTyping} 
          setIsTyping={setIsTyping} 
          handleTyping={handleTyping} 
          isOtherUserTyping={isOtherUserTyping} 
          setIsOtherUserTyping={setIsOtherUserTyping}
          token={bearerToken}
        />

      </div>
    </div>
  )
});

export default ChatPage;