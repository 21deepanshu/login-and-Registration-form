import { Fragment } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "../AuthRoute/AuthRoute";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";

function AppRouter() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route path={"/signup"} element={<Signup />} />
          <Route
            path={"/dashboard"}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default AppRouter;
