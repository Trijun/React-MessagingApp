import React, { useState } from 'react'
import { Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationsModal from './NewConversationsModal'
import NewContactsModal from './NewContactsModal'

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"



export default function Sidebar(props) { 
    
    

    //by default none of the tab is active, this is why we are setting a state that assgins conversation tab as the default tab.
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const conversationsOpen = activeKey === CONVERSATIONS_KEY
    const [modalOpen, setModalOpen] = useState(false)

    
    function toggleTab(eventKey){
        setActiveKey(eventKey)
    }

    function closeModal(){
        setModalOpen(false)
    }

    return (
        
        <div style={{width:"300px"}} className="d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={toggleTab}>
            <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                </Nav.Item>
            </Nav>

            <Tab.Content className="border-right overflow-auto flex-grow-1">
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                    <Contacts/>
                </Tab.Pane>
            </Tab.Content>

            <div className='p-2 border-top border-right'>
                Your id: <span className='text-muted'> {props.id} </span>
            </div>
            <Button className="rounded-0" onClick={()=>setModalOpen(true)}>
                New {conversationsOpen ? "conversations" : "contacts"}
            </Button>
        </Tab.Container>

        <Modal show = {modalOpen} onHide = {closeModal}>
            {conversationsOpen?
            // we are passing the closeModal as props because handleSubmit function in both of these components will prevent the default function  from closing
            // so we wont be able to close the modal after we click create contact/conversation button so using closeModal function we can achieve it
                <NewConversationsModal closeModal={closeModal}/> :
                <NewContactsModal closeModal = {closeModal}/>
            }
        </Modal>
        </div>
    )
}
