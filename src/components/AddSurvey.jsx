import React, { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/AddSurvey.scss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSurvey = ({ open, handleClose }) => {
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    start_time: null,
    end_time: null,
    isPublic: false,
    viewableByAuthorOnly: false,
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSurveyData({
      ...surveyData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const api = axios.create({
      withCredentials: false,
      // baseURL: "http://localhost:8000/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });
    setSending(true);
    api
      .post("/api/surveys/", surveyData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("پرسشنامه با موقثیت ساخته شد");
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
        handleClose();
      });
  };

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

  return (
    <>
      <ToastContainer />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <IconButton
            className="close-button"
            sx={{ mr: "-15px", mb: "15px" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          پرسشنامه جدید
        </DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="عنوان"
            variant="outlined"
            value={surveyData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={textfieldstyle}
          />
          <TextField
            name="description"
            label="توضیحات"
            variant="outlined"
            value={surveyData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={textfieldstyle}
          />
          <TextField
            name="start_time"
            label="زمان شروع"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={surveyData.start_time}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="end_time"
            label="زمان پایان"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={surveyData.end_time}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isPublic"
                checked={surveyData.isPublic}
                onChange={handleChange}
              />
            }
            label="عمومی"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="viewableByAuthorOnly"
                checked={surveyData.viewableByAuthorOnly}
                onChange={handleChange}
              />
            }
            label="فقط توسط نویسنده قابل مشاهده باشد"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {sending ? <CircularProgress size={24} /> : "ثبت"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSurvey;
