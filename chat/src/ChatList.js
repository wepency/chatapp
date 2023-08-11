import React, { useState } from "react";
import ChatListHeader from "./includes/ChatListHeader";
import { useSearchParams } from "react-router-dom";
import ChatListContacts from "./includes/ChatListContacts";
import ChatListStatics from "./includes/ChatListStatics";
import ChatListSearch from "./includes/ChatListSearch";

export default function ChatList({ socket }) {
  const [contacts, setContacts] = useState([]);
  
  const [statics, setStatics] = useState([]);

  const [searchParams] = useSearchParams();
  
  const bearerToken = searchParams.get('token');

  return(
    <div className="chat-list">

      <div className="center">

        <ChatListHeader />

        <div className="chat-list__header">
          <ChatListSearch setContacts={setContacts} />

          <ChatListStatics statics={statics} />
        </div>

        <ChatListContacts socket={socket} token={bearerToken} contacts={contacts} setContacts={setContacts} setStatics={setStatics} />

      </div>

    </div>
  )
}