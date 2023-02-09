import React from "react";
import "../assets/styles/quiz.css";
import useTimer from "./useTimer.js";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

function Quiz() {
  const { days, hours, minutes, seconds } = useTimer("2023-02-03T17:59:59");
  const { renderQuiz } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const quizid = 1;
  const [temp, setTemp] = useState([]);
  const [index, setIndex] = useState(0);
  const [tray, setTray] = useState({});
  let content = [];
  const [selectedIndex, setSelectedIndex] = React.useState();

  useEffect(() => {
    (async () => {
      const data = await renderQuiz(quizid);

      setQuestion(data.data);
    })();
    provideQuestion();
  }, [renderQuiz]);

  const provideQuestion = () => {
    const size = Object.keys(question).length;
    console.log(size);
    for (let i = 0; i < size; i++) {
      var obj = {};
      obj["questionid"] = question[i].questionid;
      obj["desc"] = question[i].question;
      obj["choice1"] = question[i].choice1;
      obj["choice2"] = question[i].choice2;
      obj["choice3"] = question[i].choice3;
      obj["choice4"] = question[i].choice4;
      obj["answer"] = question[i].answer;
      obj["selected"] = false;
      obj["status"] = "unattempted";
      obj["questionimg"] = question[i].questionimg;
      obj["choice1img"] = question[i].choice1img;
      obj["choice2img"] = question[i].choice2img;
      obj["choice3img"] = question[i].choice3img;
      obj["choice4img"] = question[i].choice4img;
      content.push(obj);
      console.log(content);
    }
    setTemp([...content]);
    console.log(temp);
    setSelectedIndex(5);
  };

  const displayQuestion = (e) => {
    setSelectedIndex(5);
    var j = e.target.value - 1;
    setIndex(j);
    setTray(temp[j]);

    console.log(tray);
  };
  const review = (e) => {
    temp[index].status = "to-review";
  };

  const save = (e) => {
    //temp[index].selected = e.target.getAttribute("value");
    temp[index].status = "answered";
  };

  const handleListItemClick = (event, idx) => {
    setSelectedIndex(idx);
    if (idx === 0) temp[index].selected = temp[index].choice1;
    if (idx === 1) temp[index].selected = temp[index].choice2;
    if (idx === 2) temp[index].selected = temp[index].choice3;
    if (idx === 3) temp[index].selected = temp[index].choice4;
  };

  return (
    <div className="quiz-container">
      <div className="header">
        <Button variant="text">
          <span className="timer">
            {hours}:{minutes}:{seconds}
          </span>
        </Button>
      </div>
      <div className="columns">
        <div className="quiz-window">
          <div className="quiz">
            <Paper elevation={0} sx={{ fontSize: 20, margin: 3 ,display:'flex',flexDirection: 'column'}}>
              {tray.desc}
              {tray.questionimg && <img src={tray.questionimg} alt="questionImg" />}
              {tray.choice1img && <img src={tray.choice1img} alt="questionImg" />}
              {tray.choice2img && <img src={tray.choice2img} alt="questionImg" />}
              {tray.choice3img && <img src={tray.choice3img} alt="questionImg" />}
              {tray.choice4img && <img src={tray.choice4img} alt="questionImg" />}
            </Paper>
            <List
              component="nav"
              
              sx={{ margin: 2 }}
            >
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText
                  value={tray.choice1}
                  //onClick={save}
                  primary={tray.choice1}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText
                  value={tray.choice2}
                  //onClick={save}
                  primary={tray.choice2}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText
                  value={tray.choice3}
                  //onClick={save}
                  primary={tray.choice3}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText
                  value={tray.choice4}
                  //onClick={save}
                  primary={tray.choice4}
                />
              </ListItemButton>
            </List>

            <Button
              className="review"
              onClick={review}
              sx={{ margin: 1 }}
              variant="outlined"
            >
              Mark for Review
            </Button>

            <Button
              className="save"
              variant="outlined"
              sx={{ margin: 1 }}
              onClick={save}
            >
              Save & Next
            </Button>
          </div>
        </div>
        <div className="nav-quiz">
          {temp.map((item) => {
            return (
              <div key={item.questionid}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 6,
                    margin: 0.5,
                  }}
                  className={item.status}
                  value={item.questionid}
                  onClick={displayQuestion}
                >
                  {item.questionid}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
