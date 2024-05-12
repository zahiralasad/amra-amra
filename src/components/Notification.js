import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './notification.css';

function Notification(props) {
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Notification;