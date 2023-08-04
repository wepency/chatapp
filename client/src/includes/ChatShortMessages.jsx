import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ChatShortMessages({ token }) {
  const [shortMessages, setShortMessages] = useState([]);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    axios.get('http://chat.mabeet.test/api/short_messages', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the bearer token in the request headers
      },
    })
    .then((response) => {
      setShortMessages(response.data.data.short_messages)
    })

    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };

    }, [])

  return (
    <div id='short-messages-container'>
        <ul class="scrollable-list">
            {shortMessages.map((message) => {
              return (<li class="item">{message.title}</li>)
            })}
        </ul>
    </div>
  )
}