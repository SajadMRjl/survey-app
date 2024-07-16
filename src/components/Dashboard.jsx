import React, { useState } from "react";
import "../styles/Dashboard.scss";
import { Avatar, Button, IconButton, Badge } from "@mui/material";
import { Assignment, Menu, MenuOpen, Notifications } from "@mui/icons-material";
import Surveys from "./Surveys";

const Dashboard = () => {
  const [isHoverd, setIsHoved] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">لوگو</div>
        <div className="sidebar-nav">
          <Button
            className="nav-item"
            variant="text"
            fullWidth
            onMouseEnter={() => setIsHoved(true)}
            onMouseLeave={() => setIsHoved(false)}
          >
            <div className="nav-name">
              <Assignment
                className={
                  isHoverd || tabIndex === 0 ? "nav-icon-hoverd" : "nav-icon"
                }
                fontSize="medium"
              />
              پرسشنامه ها
            </div>
          </Button>
        </div>
      </div>

      <div className="main">
        <div className="header">
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Menu /> : <MenuOpen />}
          </IconButton>
          <div className="icon-group">
            <IconButton>
              <Avatar sx={{ width: "24px", height: "24px" }} />
            </IconButton>
            <IconButton>
              <Badge
                badgeContent="5"
                color="success"
              >
                <Notifications />
              </Badge>
            </IconButton>
          </div>
        </div>
        <div className="container">
          <Surveys />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
