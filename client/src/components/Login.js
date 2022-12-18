import React , {useRef} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'

export default function Login(props) {
    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        props.onIdSubmit(idRef.current.value)
    }

    function createNewId(){
        props.onIdSubmit(uuidV4())
    }
    return (
        <Container className="align-items-center d-flex" style={{height:'100vh'}}>
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type="text" ref={idRef}></Form.Control>
                </Form.Group>

                {/* In bootstrap 5, use ms-auto instead of ml-auto and me-auto instead of mr-auto. */}
                <Button type="submit" className="me-2 mt-2">Login</Button>
                <Button variant="secondary" className="me-2 mt-2" onClick={createNewId}>Create New Id</Button>
            </Form>
        </Container>
    )
}
