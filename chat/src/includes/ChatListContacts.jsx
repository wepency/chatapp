import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { Axios, APP_MAIN_PATH } from '../config';

export default function ChatListContacts({ socket, contacts, setContacts, token, setStatics }) {

    const getContactsFromAPI = () => {
      //  axios.get('https://aqarbooking.com/api/chats', {
        Axios.get('chats', {
            headers: {
              Authorization: `Bearer ${token}`
            },
        }).then(res => {
          setContacts(res.data.data.chats)
          setStatics(res.data.data.statics)
        });
    }

    useEffect(() => {
      getContactsFromAPI()
    }, [])

    useEffect(() => {
    
      socket.on('refresh_contacts', getContactsFromAPI)
  
      // Clean up the effect by removing the event listener when the component is unmounted
      return () => {
        socket.off('refresh_contacts', getContactsFromAPI);
      };
      
    }, [socket])

  return (
    <div className="contacts">

    {contacts.map((contact) => {
        return (
        
        <NavLink className={`contact ${contact.is_read ? '' : 'unread'}`} to={`${APP_MAIN_PATH}/chats/${contact.uuid}?token=${token}`}>  

          <div className='right-side'>

            <div className='pic-container'>

              <div className="pic online" style={{backgroundImage: `url(${contact.chat_image})`}}></div>

              {contact.unread_messages > 0 ? (<div className="badge">
                {contact.unread_messages}
              </div>) : null}
            </div>


            <div className="name">
              {contact.chat_name}
            </div>

            <div className="message">
              {contact.last_message}
            </div>

            <div className="date">
              <small>{contact.last_message_at}</small>
            </div>

          </div>

          <div className='left-side'>
            <div className="date">
              <small>{contact.last_message_day}</small>
            </div>
          </div>
          
      </NavLink>
      )
    })}
    
  </div>
  )
}
