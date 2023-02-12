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
import Instruction from "./Instruction";

function Quiz({quizno}) {
  const { days, hours, minutes, seconds } = useTimer("2023-02-03T17:59:59");
  const { renderQuiz,submitResponse,user } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  //const quizid = 1;
  const [temp, setTemp] = useState([]);
  const [index, setIndex] = useState(0);
  const [tray, setTray] = useState({});
  let content = [];
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [instrucFlag,setInstrucFlag]=useState(false);
  const [qsize, setQsize] = useState();
  const [submitData,setSubmitData]=useState({
    
  email: "",
  response: "",
});

  useEffect(() => {
    (async () => {
      const data = await renderQuiz(quizno);
      
      setQuestion(data.data);
      
    })();
    
      //provideQuestion(size);
  }, [renderQuiz]);

  let size;
  
  const provideQuestion = () => {
    size=Object.keys(question).length;
    console.log(size);
    setQsize(size);
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
      //console.log(content);
    }
    setTemp([...content]);
    //console.log(temp);
    setSelectedIndex(5);
    setInstrucFlag(true);
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

  const next=(e,idx)=>{
    setSelectedIndex(5);
    var j = idx+1;
    setIndex(j);
    setTray(temp[j]);

    console.log(tray);
  }
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

  const submit = async ()=>{
    console.log(temp+user.email);
    setSubmitData({
      ['email']:user.email,
      ['response']:temp,
    });
    const data = await submitResponse(submitData);
    if (!data.success) {
      console.log('Quiz Submitted');
    }
  }
  return (
    <>
    {instrucFlag?(
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
              sx={{ margin: 1,width:150,height:50 }}
              variant="outlined"
            >
              Mark for Review
            </Button>

            <Button
              className="save"
              variant="outlined"
              sx={{ margin: 1,width:150,height:50 }}
              onClick={save}
            >
              Save
            </Button>

            {(index+1!==qsize)?(<Button
              className="save"
              variant="outlined"
              sx={{ margin: 1,width:150,height:50 }}
              onClick={(e)=> next(e,index)}
            >
              Next
            </Button>):
            (<Button
              className="save"
              variant="outlined"
              sx={{ margin: 1,width:150,height:50 }}
              onClick={submit}
            >
              Submit
            </Button>)}

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
    ):(<div className="instruction"><Instruction/><Button sx={{width:100,height:50}} variant='contained' color='error' onClick={provideQuestion}>start</Button></div>)}
    </>
  );
}

export default Quiz;
