import React from 'react'

export default function ChatListStatics({ statics }) {
  return (
    <div className='statics-container'>
      <div className='statics-box' id='response-rate'>
        <h4 className='text-green'>{statics.response_rate}</h4>
        <p className='statics-label'>معدل الرد</p>
      </div>

      <div className='statics-box' id='response-duration'>
        <h4 className='text-green'>{statics.response_duration}</h4>
        <p className='statics-label'>سرعة الرد</p>
      </div>
    </div>
  )
}
