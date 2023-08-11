import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import Logo from '../assets/images/image.png'

export default function ChatBody({socket, messageList, setMessageList, userData, isOtherUserTyping, setIsOtherUserTyping}) {

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
        {userData.created_at}
      </div>

      <div className='main-alert-message' style={{marginBottom: '1rem'}}>

        <span className='alert-logo'>
          <img src={Logo} />
        </span>

        <p style={{padding: '1rem', margin: 0}}>رقم التواصل مع المضيف سيظهر مباشرة بعد الحجز. لا تحرج المضيف وتطلب منه التواصل خارج المنصة ، حيث ان ذلك سيتسبب بإيقاف حسابه ويلغي ضمان حقك.</p>
      
      </div>

      {messageList.map((messageContent, index) => {

        const prevMessage = index > 0 ? messageList[index - 1] : null;
        const isNewDay = prevMessage ? (messageContent.date !== prevMessage.date) : true;
        const username = messageContent.isMe ? 'أنا' : userData.name;

        const isFirstMessage = index === 0 || (index > 0 ? prevMessage.userId !== messageContent.userId : true) || isNewDay;
      
        return (
          <>
            {isNewDay && (
                <div className='messages-group-date'>
                  {messageContent.date}
                </div>
              )}

            <div key={index} className={`message-wrapper ${messageContent.isMe ? 'me' : 'another'} ${isFirstMessage ? 'first-message' : 'sequence-message'}`}>

            {isFirstMessage && (<div className='username'>
              <span>{username}</span>
            </div>)}

            <div className='message-container'>

              {!messageContent.isMe && (<div className='user-pic'>
                {isFirstMessage && <img src={userData.avatar} />}
              </div>)}

              <div className={`message ${messageContent.isMe ? 'parker' : 'stark'}`}>
              
                {messageContent.message}

                <div className='time'>{messageContent.time}</div>

              </div>

            </div>

            </div>
          </>
        )
      })}

      {isOtherUserTyping && <div class="message stark">
        <div class="typing typing-1"></div>
        <div class="typing typing-2"></div>
        <div class="typing typing-3"></div>
      </div>}

    </div>
  )
}