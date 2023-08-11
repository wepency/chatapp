import { useParams } from 'react-router-dom';
import {Axios} from '../config';
import { BsSend } from 'react-icons/bs';
import { format } from 'date-fns';

export default function ChatFooter({ socket, messageList, setMessageList, setIsTyping, handleTyping, isOtherUserTyping, setIsOtherUserTyping, currentMessage, setCurrentMessage, token }) {

  const {chatId} = useParams();

  const handleKeyPress = async (event) => {
    if(event.keyCode === 13 || event.key === 'Enter') {
      sendMessage(event);
    }
  }

  const sendMessage = async (event) => {
    if(currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        userId: socket.id,
        room: chatId,
        isMe: true,
        receiverId: 8,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        date: format(new Date(Date.now()), 'dd/MM/yyyy')
      }

      await socket.emit("send_message", messageData);
      
      setMessageList((list) => [...list, messageData])

      Axios.post('chats/'+chatId+'/send_message', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })

      setCurrentMessage('');
    }
  }

  return (
    <div className="input">

      <div className='input-container'>
        <input 
        
        placeholder="اكتب رسالتك هنا..." 

        value={currentMessage}

        onChange={(event) => {
          setCurrentMessage(event.target.value);
          handleTyping(event);
          // Add more method calls as needed
        }}

        onBlur={() => {
          setIsTyping(false);
          socket.emit('typing', false, chatId);
        }}

        onKeyDown={handleKeyPress} type="text" 
      />

        <button className='btn btn-rounded' onClick={sendMessage}>
          <BsSend />
        </button>
      </div>
      
    </div>
  )
}