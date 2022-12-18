import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'


export default function Dashboard(props) {
  const {selectedConversation} = useConversations()
  return (
    <div className="d-flex" style={{height: "100vh"}}>
        <Sidebar id={props.id}/>
        {selectedConversation && <OpenConversation/>}
    </div>
  )
}
