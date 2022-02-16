import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";

const ProtectedRoute = ({ children, redirectTo }) => {
  const [state] = useStore();
  // console.log(state, "state");
  const isAuthenticated = state.authenticated;

  // console.log(isAuthenticated, "isAuthenticated");

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={redirectTo}></Navigate>;
  }
};

export default ProtectedRoute;
