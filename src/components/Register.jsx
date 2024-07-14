import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLenght, setPasswordLenght] = useState(false);
  const [passwordSmall, setPasswordSmall] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [passwordFieldFocus, setPasswordFieldFocus] = useState(false);

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
  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (password.length >= 8) {
      setPasswordLenght(true);
    } else {
      setPasswordLenght(false);
    }
    const smallRegex = /[a-z]/;
    const capitalRegex = /[A-Z]/;
    if (smallRegex.test(password) && capitalRegex.test(password)) {
      setPasswordSmall(true);
    } else {
      setPasswordSmall(false);
    }
    const numberRegex = /[\d]/;
    if (numberRegex.test(password)) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }
    const specialRegex = /[!@#$%^&*.?]/;
    if (specialRegex.test(password)) {
      setPasswordSpecial(true);
    } else {
      setPasswordSpecial(false);
    }
  };

  const handleSignup = () => {
    console.log("email: ", email);
    console.log("password: ", password);
  };

  return (
    <div className="main">
      <h1>لوگو</h1>
      <div className="form">
        <h3 className="title">ثبت نام</h3>
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
            ) || emailError
          }
          sx={{ height: "50px" }}
        >
          ثبت نام
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
