import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const OTPConfirmationPopup = ({ show, handleClose, handleConfirm }: any) => {
  const [otp, setOtp] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleConfirm(otp);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>OTP Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OTPConfirmationPopup;
