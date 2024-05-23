import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux-services/actions/authActions";
import { Alert } from "react-bootstrap";

function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state: any) => state.auth);
  const user = useSelector((state: any) => state.auth.user);
  const handleLogin = handleSubmit((value) => {
    dispatch(
      login(
        {
          device_id: 0,
          mobile: +value?.phoneNumber,
          is_social: 0,
          c_code: 91,
          password: value?.password,
        },
        user?.data?.is_registered
      )
    );
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Login</h3>
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
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Sign In
            </Button>
          </Form>
          <p style={{ marginTop: "10px" }}>Need a New Account?</p>
          <Button
            variant="primary"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Join Now
          </Button>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
