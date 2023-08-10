import {Axios, AxiosClear} from '../config';
import React, { useEffect, useState } from 'react'

export default function ChatShortMessages({ token }) {
  const [shortMessages, setShortMessages] = useState([]);

  useEffect(() => {
    let unmounted = false;
    // let source = axios.CancelToken.source();

    Axios.get(`short_messages`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the bearer token in the request headers
      },
    })
    .then((response) => {
      setShortMessages(response.data.data.short_messages)
    })

    return function () {
      unmounted = true;
      AxiosClear.cancel("Cancelling in cleanup");
    };

    }, [])

  return (
    <div id='short-messages-container' className={shortMessages.length === 0 ? 'hide-tab' : ''}>
        <ul class="scrollable-list">
            {shortMessages.map((message) => {
              return (<li class="item">{message.title}</li>)
            })}
        </ul>
    </div>
  )
}