import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  //handle Logout
  const handleLogout = async() => {
    try{
      await axios.post('/api/v1/auth/logout');
      localStorage.removeItem('authToken');
      toast.success('Logged out Successfully!');
      navigate("/login")
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1 rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color={"primary"} fontWeight="bold">
        AI Generator
      </Typography>
      {loggedIn ? (
        <>
        <NavLink to="/" p={1}>
          Home
        </NavLink>
        <NavLink to="/login" onClick={handleLogout} p={1}>
          Logout
        </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Login
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
