import { useSelector } from "react-redux";
import { Navigate, RouteProps, useNavigate } from "react-router-dom";

export type ProtectedRouteProps = {
  authenticationPath?: string;
  children: any;
} & RouteProps;

function ProtectedRoute(props: ProtectedRouteProps) {
  const { authenticationPath = "/", children } = props;
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

export default ProtectedRoute;
