import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    questionType: "",
    correctAnswer: "",
    options: [{ optionText: "" }],
  });

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const api = axios.create({
      // baseURL: "http://localhost:8000/",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });

    api
      .get("/surveys/")
      .then((response) => {
        if (response.status === 200) {
          setSurveys(response.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("لطفا مجددا وارد شوید.");
        } else {
          toast.error("خطا در برقراری ارتباط با سرور");
        }
      });
  }, []);

  const handleOpenDialog = (surveyId) => {
    setCurrentSurveyId(surveyId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewQuestion({
      questionText: "",
      questionType: "",
      correctAnswer: "",
      options: [{ optionText: "" }],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const options = [...newQuestion.options];
    options[index].optionText = value;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options,
    }));
  };

  const addOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, { optionText: "" }],
    }));
  };

  const handleAddQuestion = () => {
    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const api = axios.create({
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });

    api
      .post(`/surveys/${currentSurveyId}/add_question`, newQuestion)
      .then((response) => {
        if (response.status === 200) {
          toast.success("سوال با موفقیت اضافه شد.");
          handleCloseDialog();
        }
      })
      .catch((error) => {
        toast.error("خطا در اضافه کردن سوال.");
      });
  };

  const fetchQuestions = (surveyId) => {
    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const api = axios.create({
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });

    api
      .get(`/surveys/${surveyId}/list_questions`)
      .then((response) => {
        if (response.status === 200) {
          setQuestions(response.data);
        }
      })
      .catch((error) => {
        toast.error("خطا در دریافت سوالات.");
      });
  };

  const Row = ({ survey }) => {
    const [open, setOpen] = useState(false);

    const handleRowClick = () => {
      setOpen(!open);
      if (open) {
        fetchQuestions(survey.id);
      }
    };

    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleRowClick}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{survey.title}</TableCell>
          <TableCell>{survey.description}</TableCell>
          <TableCell>{new Date(survey.start_time).toLocaleString()}</TableCell>
          <TableCell>{new Date(survey.end_time).toLocaleString()}</TableCell>
          <TableCell>{survey.isPublic ? "عمومی" : "خصوصی"}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog(survey.id)}
            >
              افزودن سوال
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={7}
          >
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <Box margin={1}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  سوالات
                </Typography>
                <List>
                  {questions.map((question) => (
                    <ListItem key={question.id}>
                      <ListItemText
                        primary={question.questionText}
                        secondary={
                          <>
                            <Typography component="span">
                              {question.questionType}
                            </Typography>
                            <br />
                            <Typography component="span">
                              پاسخ صحیح: {question.correctAnswer}
                            </Typography>
                            <br />
                            {question.options.map((option) => (
                              <Typography
                                key={option.id}
                                component="span"
                              >
                                گزینه: {option.optionText}
                              </Typography>
                            ))}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>عنوان</TableCell>
            <TableCell>توضیحات</TableCell>
            <TableCell>زمان شروع</TableCell>
            <TableCell>زمان پایان</TableCell>
            <TableCell>دسترسی</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surveys.map((survey) => (
            <Row
              key={survey.id}
              survey={survey}
            />
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>افزودن سوال جدید</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="questionText"
            label="متن سوال"
            type="text"
            fullWidth
            value={newQuestion.questionText}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="questionType"
            label="نوع سوال"
            type="text"
            fullWidth
            value={newQuestion.questionType}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="correctAnswer"
            label="پاسخ صحیح"
            type="text"
            fullWidth
            value={newQuestion.correctAnswer}
            onChange={handleChange}
          />
          {newQuestion.options.map((option, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`گزینه ${index + 1}`}
              type="text"
              fullWidth
              value={option.optionText}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <Button onClick={addOption}>افزودن گزینه</Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
          >
            لغو
          </Button>
          <Button
            onClick={handleAddQuestion}
            color="primary"
          >
            افزودن
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default SurveyList;
