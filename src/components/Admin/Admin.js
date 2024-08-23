import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Admin() {

    const handleClick = () => {
        // props.onHide();
        // if (props.linkto) {
        //     navigate(props.linkto);
        // }
    }
    
    return (
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">              
                Admin Login
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClick}>OK</Button>
        </Modal.Footer>
    </Modal>
    )
}
export default Admin;