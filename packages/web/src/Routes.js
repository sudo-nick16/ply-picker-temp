import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signup from "./pages/Signup/Signup";
import OnlyUnauthRoute from "./routes/OnlyUnauthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute redirectTo="/login"></ProtectedRoute>}
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute redirectTo="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <OnlyUnauthRoute redirectTo={"/me"}>
              <Signup />
            </OnlyUnauthRoute>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <OnlyUnauthRoute redirectTo={"/me"}>
              <Login />
            </OnlyUnauthRoute>
          }
        />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
