import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactsModal(props) {
    const idRef = useRef()
    const nameRef = useRef()

    const {createContact} = useContacts()

    function handleSubmit(e)
    {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        props.closeModal()
    }
    return (
        <div>
        <Modal.Header closeButton> Create Contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" ref={idRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
                <Button type="submit" className='mt-3'>Create</Button>
            </Form>
        </Modal.Body>
        </div>
    )
}
