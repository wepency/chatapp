import React, { useEffect, useState } from 'react'

export default function Chat({socket, room, username}) {
    const [currentMessage, setCurentMessage] = useState("");
    
    const sendMessages = async () => {

      if(currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }

        await socket.emit("send_message", messageData);
      }
    }

    useEffect(() => {

      socket.on('receive_message', (data) => {
        console.log(data)
      });
      
    }, [socket])
    
  return (
    <div>
        <div className='chat-header'>
            <p>Live chat</p>
        </div>

        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type='text' onChange={(event) => {
              setCurentMessage(event.target.value)
            }} placeholder='Heyy...' />

            <button onClick={sendMessages}>send</button>
        </div>
    </div>
  )
}
