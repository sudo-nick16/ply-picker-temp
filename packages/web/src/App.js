import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
