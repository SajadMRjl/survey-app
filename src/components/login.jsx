import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Register.scss";

const textfieldstyle = {
  "& label": {
    transformOrigin: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    fontSize: "small",
    fontWeight: 400,
    overflow: "unset",
  },
  "& legend": {
    textAlign: "right",
    display: "flex",
    justifyContent: "center",
    fontSize: "10px",
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "10px",
  },
  "& .MuiSelect-select": {
    paddingRight: "15px !important",
  },
  "& .MuiFormHelperText-root": {
    textAlign: "right !important",
    marginRight: "0",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const api = axios.create({
      // baseURL: "http://localhost:8000/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: false,
    });
    setSending(true);
    api
      .post("users/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("token_type", response.data.token_type);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("نام کاربری یا رمز اشتباه می باشد.");
        } else {
          toast.error("خطا در برقراری ارتباط با سرور");
        }
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="main">
      <ToastContainer />
      <h1>لوگو</h1>
      <div className="form">
        <h3 className="title">ورود</h3>
        <TextField
          sx={textfieldstyle}
          label="نام کاربری"
          variant="outlined"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <TextField
          label="رمز"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={handlePassword}
          sx={textfieldstyle}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={username.length === 0 || password.length === 0}
          sx={{ height: "50px" }}
        >
          {sending ? <CircularProgress size={24} /> : "ورود"}
        </Button>
      </div>
      <div className="login">
        <div>حساب کاربری ندارید؟</div>
        <Link to="/auth/register">ثبت نام کنید</Link>
      </div>
    </div>
  );
};

export default Login;
