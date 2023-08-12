import { useParams } from 'react-router-dom';
import {Axios} from '../config';
import { format } from 'date-fns';
import {MdSend} from 'react-icons/md'

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

<svg fill="#333333" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path></svg>

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
          <MdSend />
        </button>
      </div>
      
    </div>
  )
}