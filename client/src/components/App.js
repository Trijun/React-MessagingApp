import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from  './Login'
import Dashboard from './Dashboard'
import ContactsProvider from '../contexts/ContactsProvider'
import ConversationsProvider from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

export default function App(){

    const [id,setId] = useLocalStorage('id')
    const dashboard = (
        <SocketProvider id={id}>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashboard id={id} />
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
        
    )

    function onIdSubmit(recievedId){
        setId(recievedId)
    }

    return(
        id? dashboard: <Login onIdSubmit={onIdSubmit}/>
    )
}