import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";
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

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMes, setEmailErrorMes] = useState("ایمیل نامعتبر است.");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMes, setUsernameErrorMes] = useState(
    "نام کاربری نمی‌تواند خالی باشد."
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLenght, setPasswordLenght] = useState(false);
  const [passwordSmall, setPasswordSmall] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [passwordFieldFocus, setPasswordFieldFocus] = useState(false);
  const [sending, setSending] = useState(false);

  const validateEmail = (e) => {
    const tmp = e.target.value;
    setEmail(tmp);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(tmp)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validatePassword = (e) => {
    const tmp = e.target.value;
    setPassword(tmp);
    if (tmp.length >= 8) {
      setPasswordLenght(true);
    } else {
      setPasswordLenght(false);
    }
    const smallRegex = /[a-z]/;
    const capitalRegex = /[A-Z]/;
    if (smallRegex.test(tmp) && capitalRegex.test(tmp)) {
      setPasswordSmall(true);
    } else {
      setPasswordSmall(false);
    }
    const numberRegex = /[\d]/;
    if (numberRegex.test(tmp)) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }
    const specialRegex = /[!@#$%^&*.?]/;
    if (specialRegex.test(tmp)) {
      setPasswordSpecial(true);
    } else {
      setPasswordSpecial(false);
    }
  };

  const validateUsername = (e) => {
    const tmp = e.target.value;
    setUsername(tmp);
    if (tmp.length > 0) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  const handleSignup = () => {
    const api = axios.create({
      // baseURL: "http://localhost:8000/",
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    });
    setSending(true);
    api
      .post("users/register", { email, password, username })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("token_type", response.data.token_type);
          toast.success("ثبت‌نام با موفقیت انجام شد.");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setUsernameError(true);
          setUsernameErrorMes("نام کاربری تکراری است.");
          setEmailErrorMes("ایمیل نامعتبر است.");
        } else if (error.response.status === 400) {
          setEmailError(true);
          setEmailErrorMes("ایمیل تکراری است.");
          setUsernameErrorMes("نام کاربری نمی‌تواند خالی باشد.");
        } else {
          setUsernameErrorMes("نام کاربری نمی‌تواند خالی باشد.");
          setEmailErrorMes("ایمیل نامعتبر است.");
        }
        toast.error("خطا در ثبت‌نام");
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
        <h3 className="title">ثبت نام</h3>
        <TextField
          sx={textfieldstyle}
          label="نام کاربری"
          variant="outlined"
          name="username"
          value={username}
          error={usernameError}
          helperText={usernameError && usernameErrorMes}
          onChange={validateUsername}
        />
        <TextField
          sx={textfieldstyle}
          label="ایمیل"
          variant="outlined"
          name="email"
          value={email}
          error={emailError}
          helperText={emailError && emailErrorMes}
          onChange={validateEmail}
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
          onChange={validatePassword}
          onFocus={() => setPasswordFieldFocus(true)}
          onAbort={() => setPasswordFieldFocus(false)}
          sx={textfieldstyle}
          error={
            passwordFieldFocus &&
            !(
              passwordLenght &&
              passwordNumber &&
              passwordSmall &&
              passwordSpecial
            )
          }
        />
        <div className={passwordFieldFocus ? "password-req" : "none"}>
          <div className="header">رمز عبور باید:</div>
          <div className="req">
            <CheckCircle
              sx={{ fontSize: "1rem " }}
              color={passwordLenght ? "success" : "error"}
            />
            <div className={passwordLenght ? "success" : "error"}>
              ۸ کاراکتر باشد.
            </div>
          </div>
          <div className="req">
            <CheckCircle
              sx={{ fontSize: "1rem " }}
              color={passwordSmall ? "success" : "error"}
            />
            <div className={passwordSmall ? "success" : "error"}>
              ترکیبی از حروف بزرگ و کوچک باشد.
            </div>
          </div>
          <div className="req">
            <CheckCircle
              sx={{ fontSize: "1rem " }}
              color={passwordNumber ? "success" : "error"}
            />
            <div className={passwordNumber ? "success" : "error"}>
              شامل اعداد باشد.
            </div>
          </div>
          <div className="req">
            <CheckCircle
              sx={{ fontSize: "1rem " }}
              color={passwordSpecial ? "success" : "error"}
            />
            <div className={passwordSpecial ? "success" : "error"}>
              شامل کاراکترهای خاص (!@#$%...) باشد.
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleSignup}
          disabled={
            !(
              passwordLenght &&
              passwordNumber &&
              passwordSmall &&
              passwordSpecial
            ) ||
            emailError ||
            sending ||
            usernameError
          }
          sx={{ height: "50px" }}
        >
          {sending ? <CircularProgress size={24} /> : "ثبت نام"}
        </Button>
      </div>
      <div className="login">
        <div>قبلا ثبت‌نام کرده‌اید؟</div>
        <Link to="/auth/login">وارد شوید</Link>
      </div>
    </div>
  );
};

export default Register;
