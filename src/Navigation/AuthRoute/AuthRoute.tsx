import { useSelector } from "react-redux";
import { Navigate, RouteProps, useNavigate } from "react-router-dom";

export type AuthRouteProps = {
  authenticationPath?: string;
  children: any;
} & RouteProps;

function AuthRoute(props: AuthRouteProps) {
  const { authenticationPath = "/dashboard", children } = props;
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    return children;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

export default AuthRoute;
