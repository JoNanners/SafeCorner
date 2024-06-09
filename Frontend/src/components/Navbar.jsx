import { NavLink } from "react-router-dom";
import "./Navbar.css";
const isLoggedIn = localStorage.getItem("token");
console.log("isLoggedIn", isLoggedIn);
export const Navbar = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Coding Maniacs</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/logout"> Logout </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard"> Dashboard </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
