import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux-services/actions/authActions";

function Dashboard() {
  const user = useSelector((state: any) => state.auth.userData);
  const userId = useSelector(
    (state: any) => state.auth.user?.data?.is_registered
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(userId));
    navigate("/");
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>DASHBOARD</h2>
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
          <div style={{ marginBottom: "10px" }}>Name: {user.name}</div>
          <div style={{ marginBottom: "10px" }}>Email: {user.email}</div>
          <div style={{ marginBottom: "10px" }}>
            Phone Number: {user.phoneNumber}
          </div>
          <Button variant="danger" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
