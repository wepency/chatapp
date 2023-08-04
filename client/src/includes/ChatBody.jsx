import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';

export default function ChatBody({socket, messageList, setMessageList, isTyping, setIsTyping, handleTyping, isOtherUserTyping, setIsOtherUserTyping}) {

    const chatRef = useRef(null);
    const {chatId} = useParams();

  // Function to scroll the chat div to the bottom
  const scrollChatToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  // Call the scrollChatToBottom function after the component renders or updates
  useEffect(() => {
    scrollChatToBottom();
  });

  useEffect(() => {
    
    // Create the socket event listener
    const receiveMessageListener = (data) => {
      console.log(data);
      data.isMe = false;
      setMessageList((list) => [...list, data]);
    };

    // Create the socket event listener
    const typingListener = (data) => {
      setIsOtherUserTyping(data.isTyping);
    };

    // Add the event listener to the socket
    socket.on('receive_message', receiveMessageListener);

    socket.on('typing', typingListener);

    // Clean up the effect by removing the event listener when the component is unmounted
    return () => {
      socket.off('receive_message', receiveMessageListener);
      socket.off('typing', typingListener);
    };
    
  }, [socket])

  return (
    <div className="messages" id="chat" ref={chatRef}>

      <div className="messages-group-date">
        Today at 11:41
      </div>

      {/* <div className="message parker">
        Hey, man! What's up, Mr Stark? 👋
      </div>
      <div className="message parker">
        Hey, man! What's up, Mr Stark? 👋
      </div>
      <div className="message parker">
        Hey, man! What's up, Mr Stark? 👋
      </div>
      <div class="message parker">
        Hey, man! What's up, Mr Stark? 👋
      </div>
      <div class="message stark">
        Kid, where'd you come from? 
      </div>
      <div class="message parker">
        Field trip! 🤣
      </div>

      <div class="message parker">
        Uh, what is this guy's problem, Mr. Stark? 🤔
      </div>

      <div class="message stark">
        Uh, he's from space, he came here to steal a necklace from a wizard.
      </div> */}

      {messageList.map((messageContent) => {
        return (<div className={`message ${messageContent.isMe ? 'parker' : 'stark'}`}>
          {messageContent.message}

          <div className='time'>{messageContent.time}</div>
          </div>)
      })}

      {isOtherUserTyping && <div class="message stark">
        <div class="typing typing-1"></div>
        <div class="typing typing-2"></div>
        <div class="typing typing-3"></div>
      </div>}

      {/* <div class="message stark">
        <div class="typing typing-1"></div>
        <div class="typing typing-2"></div>
        <div class="typing typing-3"></div>
      </div> */}

    </div>
  )
}