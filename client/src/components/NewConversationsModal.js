import React ,{useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationsModal({closeModal}) {

    const {contacts} = useContacts()
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const {createConversation} = useConversations()


    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId =>{
                    return contactId !== prevId
                })
            }
            else{
                return(
                    [...prevSelectedContactIds, contactId]
                )
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    return (
        <div>
        <Modal.Header closeButton> Create Conversations </Modal.Header>
        <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => {
                        return(
                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check
                                    type="checkbox"
                                    value={selectedContactIds.includes(contact.id)}
                                    label={contact.name}
                                    onChange={()=> handleCheckboxChange(contact.id)}
                                />
                            
                            </Form.Group>
                        )
                    })}
                    <Button type="submit" className='mt-3'>Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}
