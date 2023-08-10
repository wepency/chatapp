import React from 'react'
import { BsSearch } from 'react-icons/bs';

export default function ChatListSearch() {
  return (
    <div id='chat-list__form'>

      <div className='chat-list__search-input'>
        <input type='text' placeholder='ابحث عن اسم او نص ...' />
        <BsSearch />
      </div>

    </div>
  )
}
