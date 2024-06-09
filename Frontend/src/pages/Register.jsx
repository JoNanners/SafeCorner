import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      // alert("Registration Successful");
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("data", data);
      console.log("response", response);
      console.log("response from server", data.extraDetails);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration Successful");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        alert(data.extraDetails ? data.extraDetails : data.message);
        console.log("invalid credentials");
      }
      // console.log(response);
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <h1 className="title">Registration form</h1>
          <form onSubmit={handleSubmit} className="form" id="registerForm">
            <div className="form-group">
              <label htmlFor="name">username</label>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Enter your name"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  className="input"
                  placeholder="enter your email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">phone</label>
              <div className="input-container">
                <input
                  type="number"
                  id="phone"
                  className="input"
                  placeholder="phone"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                  name="password"
                  placeholder="Enter your password"
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
              Register Now
            </button>
            Already Registered?
            <button
              className="btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
