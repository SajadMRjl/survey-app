import React, { useState } from "react";
import "../styles/Surveys.scss";
import { Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import AddSurvey from "./AddSurvey";

const Surveys = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`survey-container ${open ? "blur" : ""}`}>
      <div className="survey-header">
        <h3>پرسشنامه ها من</h3>
        <Button
          className="survey-button"
          variant="contained"
          onClick={handleClick}
        >
          <AddCircle className="nav-icon" />
          پرسشنامه جدید
        </Button>
      </div>
      <AddSurvey
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Surveys;
