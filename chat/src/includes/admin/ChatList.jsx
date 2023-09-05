import React from 'react'

export default function ChatList({ activeTab }) {
    const chatData = [
      { name: 'User 1', image: 'user1.jpg', lastMessage: 'Hello there!' },
      { name: 'User 2', image: 'user2.jpg', lastMessage: 'How\'s it going?' }
    ];
  
    return (
      <div className="chat-container">
        {chatData.map((chat, index) => (
          <div key={index} className={`chat-list ${activeTab === index + 1 ? 'active' : ''}`}>
            <div className="contact">
              <img src={chat.image} alt={chat.name} />
              <div className="contact-info">
                <div className="contact-name">{chat.name}</div>
                <div className="contact-last-message">{chat.lastMessage}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };