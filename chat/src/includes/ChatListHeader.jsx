import React from 'react'
import { BsChat } from 'react-icons/bs'

export default function ChatListHeader() {
  return (
    <header className='chat-header'>
        <h2>
          <BsChat />
          <span>المحادثات</span>
        </h2>
    </header>
  )
}
