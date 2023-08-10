import React from 'react'

import { FaAngleRight } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import { NavLink } from 'react-router-dom';

import {APP_MAIN_PATH} from '../config'

export default function ChatHeader({ userData, token }) {

  return (
    <div className="chat-header online bar">

      <div className='right-side'>

      <NavLink to={`${APP_MAIN_PATH}/?token=${token}`}>
        <FaAngleRight className='go-back' />
      </NavLink>
      
        <div className="pic" style={{backgroundImage: `url(${userData.avatar})`}}></div>

        <div className='right-side--content'>

          <div className="name">
            {userData.name}
          </div>

          <div className="user-status">متصل الأن</div>

        </div>
        
      </div>
      
      <div className='left-side'>
        <BsThreeDots />
      </div>

    </div>
  )
  
}