import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log("email: ", email);
    console.log("password: ", password);
  };

  return (
    <div className="main">
      <h1>لوگو</h1>
      <div className="form">
        <h3 className="title">ورود</h3>
        <TextField
          sx={textfieldstyle}
          label="ایمیل"
          variant="outlined"
          name="email"
          value={email}
          error={emailError}
          helperText={emailError && "یک آدرس ایمیل معتبر وارد نمایید."}
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
          onChange={handlePassword}
          sx={textfieldstyle}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={emailError || password.length === 0}
          sx={{ height: "50px" }}
        >
          ورود
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
