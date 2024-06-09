import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const token = localStorage.getItem("token");
  //   useEffect(() => {
  //     localStorage.removeItem("token");
  //     // alert("Logout Successful");
  //   }, []);
  localStorage.removeItem("token");
  //   const isLoggedIn = !!token;
  //   console.log(isLoggedIn);
  return <Navigate to="/login" />;
};
