import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../Redux-services/actions/authActions";
import { Alert } from "react-bootstrap";
import OTPConfirmationPopup from "./OTPConfirmationPopup/OTPConfirmationPopup";
function Signup() {
  const { handleSubmit, register, watch } = useForm();
  const user = useSelector((state: any) => state.auth.userData);
  const { error, isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkConfirmPassword, setCheckConfirmPassword] = useState<boolean>();
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleOpenOtpPopup = handleSubmit((value: any) => {
    dispatch({
      type: "SAVE_USER_DATA",
      payload: {
        name: value?.userName,
        email: value?.email,
        mobile: value?.phoneNumber,
        password: value?.password,
      },
    });
    dispatch(
      sendOtp({
        mobile: value?.phoneNumber,
        resend: 0,
        is_registration: 1,
        c_code: +91,
      })
    );
    setShowOtpPopup(true);
  });
  const handleCloseOtpPopup = () => setShowOtpPopup(false);

  const handleConfirmOtp = (otp: any) => {
    console.log(user);
    dispatch(
      signup({
        name: user?.name,
        email: user?.email,
        mobile: +user?.mobile,
        password: user?.password,
        country: undefined,
        state: "Andhra Pradesh",
        city: "Amadalavalasa",
        device_id: 0,
        is_social: 0,
        device_token: 0,
        otp: otp,
      })
    );
    if (!isAuthenticated) {
      navigate("/");
    }
    handleCloseOtpPopup();
  };
  useEffect(() => {
    return watch("password") !== watch("confirm_password") &&
      watch("confirm_password")
      ? setCheckConfirmPassword(false)
      : setCheckConfirmPassword(true);
  }, [watch("confirm_password")]);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Create Your Account</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Form onSubmit={handleOpenOtpPopup}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register("userName")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Create password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create Password"
                {...register("password")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                {...register("confirm_password")}
                required
              />
            </Form.Group>
            {checkConfirmPassword === false && (
              <p style={{ color: "red" }}>{"Password do not match"}</p>
            )}
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
          <p style={{ marginTop: "10px" }}>Already have an account ?</p>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Sign In
          </Button>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </div>
      </div>
      <OTPConfirmationPopup
        show={showOtpPopup}
        handleClose={handleCloseOtpPopup}
        handleConfirm={handleConfirmOtp}
      />
    </>
  );
}

export default Signup;
