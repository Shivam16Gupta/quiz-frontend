import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledEngineProvider } from "@mui/material/styles";
// import Rating from "@mui/material/Rating";
import "../assets/styles/performance.css";
import Typography from "@mui/material/Typography";
import useTimer from "./useTimer";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

function Performance(props) {
  const location = useLocation();
  const history = useNavigate();
  const {  hours, minutes, seconds } = useTimer(2 * 60 * 1000);
  const { submitPerformance,user } = useContext(UserContext);
  const [unattempted, setUnattempted] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [review, setReview] = useState(0);
  const [score, setScore] = useState(0);
  const pmarks=parseInt(location.state.p);
  const nmarks=parseInt(location.state.n);
  const [total, setTotal] = useState(0);
  let performance={
    quizid:'',
    email:'',
    unattempted:'',
    review:'',
    answered:'',
    score:''
  };


  useEffect(() => {
    let size = location.state.temp.length;
    setTotal(size);
  
    let marks=0,unattempt=0,rev=0,ans=0;
    const data = location.state.temp;
    for (let i = 0; i < size; i++) {
      if (data[i].status === "unattempted") 
       { setUnattempted(unattempted=>unattempted + 1);
          ++unattempt;
          console.log(unattempt);
       }
      else
      if (data[i].status === "to-review") 
      { ++rev;
        setReview(review=>review + 1);
      }
      else
      if (data[i].status === "answered") 
      { ++ans;
        setAnswered(answered=>answered + 1);
        if (data[i].selected === data[i].answer)
        { 
          marks+=pmarks;
          setScore(marks);
          console.log(marks);
        }
        else
        {
          marks-=nmarks;
          setScore(marks);
          console.log(marks);
        }
      }
      
    } 

    performance={
      quizid:location.state.quizno.num,
      email:user.email,
      unattempted:unattempt,
      review:rev,
      answered:ans,
      score:marks
    };
    handlePerformance();
    

    
  }, []);
 
  const handlePerformance=() => {
    console.log(performance);
    (async () => {
      const data = await submitPerformance(performance);
      if (!data.success) {
        console.log("Quiz Submitted");
      }
      else
      {
        console.log(data.message);
      }
    })();
  }

  useEffect(() => {
    if(!hours && !minutes && !seconds){
      history('/');
    }
  }, [hours, minutes, seconds]);
  
  
  return (
    <div className="scoresheet">
      <StyledEngineProvider injectFirst>
        <Nav/>
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Your Performance Sheet</TableCell>
                <TableCell></TableCell>
                {/* <TableCell align="right">Answered</TableCell>
                <TableCell align="right">Review</TableCell>
                <TableCell align="right">Unattempted</TableCell>
                <TableCell align="right">Score</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total Questions</TableCell>
                <TableCell component="th" scope="row">
                  {total}
                </TableCell>
                {/* <TableCell align="right">{answered}</TableCell>
                <TableCell align="right">{review}</TableCell>
                <TableCell align="right">{unattempted}</TableCell>
                <TableCell align="right">{score}</TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell>Answered</TableCell>
                <TableCell component="th" scope="row">
                  {answered}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Review</TableCell>
                <TableCell component="th" scope="row">
                  {review}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Unattempted</TableCell>
                <TableCell component="th" scope="row">
                  {unattempted}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography sx={{width:"250px",margin:"auto",textAlign:"center",color:"green"}} variant="h6"><b>Your test has been submitted successfully! You can now close this window or you will be automaticaly redirected after...{hours}:{minutes}:{seconds} </b></Typography>
        </TableContainer>
      </StyledEngineProvider>
    </div>
  );
}

export default Performance;
