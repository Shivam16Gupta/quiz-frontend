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
import Rating from "@mui/material/Rating";
import "../assets/styles/performance.css";

function Performance(props) {
  const location = useLocation();
  const { QuizInfo } = useContext(UserContext);
  const [unattempted, setUnattempted] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [review, setReview] = useState(0);
  const [score, setScore] = useState(0);
  const [pmarks, setPmarks] = useState(0);
  const [nmarks, setNmarks] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await QuizInfo();
      setPmarks(data.data.positivemarks);
      setNmarks(data.data.negativemarks);
    })();
  }, []);

  useEffect(() => {
    let size = location.state.length;
    setTotal(size);
    const data = location.state;
    let unattempted = 0,
      review = 0,
      answered = 0,
      score = 0;
    for (let i = 0; i < size; i++) {
      if (data[i].status === "unattempted") setUnattempted(unattempted + 1);
      if (data[i].status === "answered") setAnswered(answered + 1);
      if (data[i].status === "to-review") setReview(review + 1);
      if (data[i].selected === data[i].answer) setScore(score + pmarks);
      else setScore(score - nmarks);
    }
  }, []);

  console.log(location.state.length);
  return (
    <div className="scoresheet">
      <StyledEngineProvider injectFirst>
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
              <TableRow>
                <TableCell>Marks Acheived</TableCell>
                <TableCell component="th" scope="row">
                  {score}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Rating name="size-large" defaultValue={2} size="large" />
        </TableContainer>
      </StyledEngineProvider>
    </div>
  );
}

export default Performance;
