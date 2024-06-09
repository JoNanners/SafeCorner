import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form response", response);
      const data = await response.json();

      if (response.ok) {
        console.log("response from server", data);
        localStorage.setItem("token", data.token);

        alert("Login Successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        alert(data.extraDetails ? data.extraDetails : data.message);
        console.log("invalid credentials");
      }

      // alert("Login Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <h1 className="title">Login form</h1>
          {/* mb-3 is margin bottom 3 */}
          {/* form area */}
          <form onSubmit={handleSubmit} className="form" id="loginForm">
            <div className="form-group">
              <label htmlFor="userId">email</label>
              <div className="input-container">
                <input
                  type="email"
                  className="input"
                  placeholder="email"
                  id="userId"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <div className="input-container">
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="enter your password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            First time here? Try Registering
            <button
              className="btn"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </form>
        </div>
        <footer className="footer">
          <>
            &copy; 2024 CommUnity. All rights reserved. Designed and Developed
            by CodingManiacs
          </>
        </footer>
      </div>
    </>
  );
};
