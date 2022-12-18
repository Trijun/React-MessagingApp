import React ,{useState, useCallback} from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'
export default function OpenConversation() {

    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if(node){
            //node.scrolIntoView({ smooth:true})
        }
    },[])

    const {sendMessage, selectedConversation} = useConversations()

    function handleSubmit(e){
        e.preventDefault()
       
        sendMessage( 
            selectedConversation.recipients.map( r => r.id),
            text
        )

        // after sending message, we need to empty the text 
        setText(" ")
        e.target.reset()
       

       
        
    }
    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index)=>{
                        const lastMessage = selectedConversation.messages.length-1 ===  index
                        return(
                            <div 
                                ref = {lastMessage ? setRef : null}
                                key={index} 
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end': ''}`}
                                >
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white': 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'align-self-end' :''}`}>
                                    {message.fromMe? "You" : message.sender}
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                        as="TextArea"
                        required
                        value={text}
                        onChange  = {e => setText(e.target.value)}
                        style={{height:"75px", resize:"none"}} 
                        />
                        <Button type="submit" >Send</Button>
                    </InputGroup>
                </Form.Group>

            </Form>
        </div>
        
    )
}
