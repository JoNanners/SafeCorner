import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
// import { Navbar } from "./components/Navbar";
import { Reporting } from "./pages/Reporting";
import { Tracking } from "./pages/Tracking";
import { Notifications } from "./pages/Notifications";
import { Forums } from "./pages/Forums";
// import { Footer } from "./components/Footer";
import { Logout } from "./pages/Logout";
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/forums" element={<Forums />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default App;
