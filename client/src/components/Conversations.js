import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {

  const {conversations, selectedConversationIndex} = useConversations()

  return (
    <ListGroup className="rounded-0">
      {conversations.map((conversation, index)=>{
        return(
          <ListGroup.Item 
            key={index}
            action // gives it the ability to be selectable
            active = {conversation.selected}
            onClick={()=> selectedConversationIndex(index)}
          >
          {conversation.recipients.map( r => r.name).join(', ')}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}