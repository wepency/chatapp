import React, {useState} from 'react'

import styles from './admin-chat.module.css'
import {BsSearch} from 'react-icons/bs'
import {FaCircle} from 'react-icons/fa'

import Tabs from './includes/admin/Tabs';
import ChatList from './includes/admin/ChatList';

export default function AdminChat() {
  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
        <div className={styles.container}>
    <div className={styles['people-list']} id="people-list">

      <div className={styles.search}>
        <input type="text" placeholder="search" />
        <BsSearch className={styles.search} />
      </div>

    <Tabs activeTab={activeTab} changeTab={changeTab} />
      <ChatList activeTab={activeTab} />
      
      <ul className={styles.list}>
        <li>

          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
          
          <div className={styles.about}>
            <div className={styles.name}>Vincent Porter</div>
            <div className={styles.status}>
              <FaCircle /> online
            </div>
          </div>
        </li>
 
      </ul>
    </div>
    
    <div className={styles.chat}>
      <div className={styles['chat-header']}>

        <div className={styles['chat-images']}>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
        </div>
        
        <div className={styles['chat-about']}>
          <div className={styles['chat-with']}>Chat with Vincent Porter</div>
          <div className={styles['chat-num-messages']}>already 1 902 messages</div>
        </div>

      </div>
      
      <div className={styles['chat-history']}>

        <ul>
          <li>
            <div className={styles['message-data align-right']}>
              <span className={styles['message-data-time']} >10:10 AM, Today</span> &nbsp; &nbsp;
              <span className={styles['message-data-name']} >Olia</span> <FaCircle className='me' />  
            </div>

            <div className={`${styles.message} ${styles['other-message']} ${styles['float-right']}`}>
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </li>
          
          <li>
            <div className={styles['message-data']}>
              <span className={styles['message-data-name']}><FaCircle className='online' /> Vincent</span>
              <span className={styles['message-data-time']}>10:12 AM, Today</span>
            </div>
            <div className={`${styles.message} ${styles['my-message']}`}>
              Are we meeting today? Project has been already finished and I have results to show you.
            </div>
          </li>
          
          <li>
            <div className={`${styles['message-data']} ${styles['align-right']}`}>
              <span className={`${styles['message-data-time']}`}>10:14 AM, Today</span> &nbsp; &nbsp;
              <span className={`${styles['message-data-name']}`}>Olia</span> <FaCircle className='me' />
              
            </div>

            <div className={`${styles.message} ${styles['other-message']} ${styles['float-right']}`}>
              Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
            </div>

          </li>
          
          <li>
            <div className={styles['message-data']}>
              <span className={styles['message-data-name']}><FaCircle className='online' /> Vincent</span>
              <span className={styles['message-data-time']}>10:31 AM, Today</span>
            </div>

            <FaCircle className='online' />
          </li>
          
        </ul>
        
      </div>
      
      <div className={styles['chat-message']}>

        <textarea name="message-to-send" id={styles['message-to-send']} placeholder ="Type your message" rows="3"></textarea>
        <button>Send</button>

      </div>
      
    </div>
    
  </div>

    </div>
  )
}
