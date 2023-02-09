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
import Button from '@mui/material/Button';

function Quiz() {
  const { days, hours, minutes, seconds } = useTimer("2023-02-03T17:59:59");
  const { renderQuiz } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const quizid = 1;
  const [temp, setTemp] = useState([]);
  const [index, setIndex] = useState(0);
  const [tray, setTray] = useState({});
  let content = [];

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
      content.push(obj);
      console.log(content);
    }
    setTemp([...content]);
    console.log(temp);
  };

  const displayQuestion = (e) => {
    var j = e.target.value - 1;
    setIndex(j);
    setTray(temp[j]);

    console.log(tray);
  };
  const review = (e) => {
    temp[index].status = "to-review";
  };

  const save = (e) => {
    temp[index].selected = e.target.getAttribute("value");
    
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, idx) => {
    setSelectedIndex(idx);
    if(idx===0)
    temp[index].selected=temp[index].choice1;
    if(idx===1)
    temp[index].selected=temp[index].choice2;
    if(idx===2)
    temp[index].selected=temp[index].choice3;
    if(idx===3)
    temp[index].selected=temp[index].choice4;
  };

  return (
    <div className="quiz-container">
      <div className="header">
        
        <Button variant="text"><span className="timer">
          {hours}:{minutes}:{seconds}
        </span></Button>
        
      </div>
      <div className="columns">
        <div className="quiz-window">
          <div className="quiz">
            <Paper elevation={0}>{tray.desc}</Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText
                  value={tray.choice1}
                  onClick={save}
                  primary={tray.choice1}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText
                  value={tray.choice2}
                  onClick={save}
                  primary={tray.choice2}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText
                  value={tray.choice3}
                  onClick={save}
                  primary={tray.choice3}
                />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText
                  value={tray.choice4}
                  onClick={save}
                  primary={tray.choice4}
                />
              </ListItemButton>
            </List>
            
            <Button className="review" onClick={review} variant="outlined">Mark for Review</Button>
            
            <Button
              className="save"
              variant="outlined"
              onClick={() => {
                temp[index].status = "answered";
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="nav-quiz">
          {temp.map((item) => {
            return (
              <div key={item.questionid}>
                <Button variant="contained"
                  sx={{
                    borderRadius:6,
                    margin:0.5
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
