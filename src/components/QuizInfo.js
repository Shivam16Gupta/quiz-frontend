import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Quiz from "./Quiz";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from '@mui/material/Chip';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Nav from "./Nav";
import { useLocation } from "react-router-dom";
import QuizBox from "../assets/styles/quizbox.js";
import Banner from "./Banner";


const QuizInfo=()=> {
  const { QuizInfo,user } = useContext(UserContext);
  const [quizinfo, setQuizinfo] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(false);
  const [pmarks, setPmarks] = useState();
  const [nmarks, setNmarks] = useState();
  const [quizNum, setQuizNum] = useState({
    num:'',
    
  });
  const [time,setTime]=useState();
  const location = useLocation();
  console.log(user);
  const para=location.state;
  const search=new FormData();
  if(!para){
    search.append('email',user.email);
    search.append('search','%');
    }
    else{
      search.append('email',user.email);
      search.append('search',para);
    }

  useEffect(() => {
    QuizInfo(search).then(data => {
      setQuizinfo(data);
    });
  }, [para]);
  

  const handleQuiz = (e) => {
    setSelectedQuiz(true);
    setQuizNum(e.quizid);
    setTime(e.duration_hrs);
    setPmarks(e.positivemarks);
    setNmarks(e.negativemarks);
  };

const handleTags=(e)=>{
  const tag=e.split(',');
return tag.map((id)=>{
return <Chip label={id} variant="outlined" />
});
}
  
  return (
    <>
        {selectedQuiz ? (
          <Quiz quizno={quizNum} duration={time} p={pmarks} n={nmarks} />
        ) : (<div><Nav/><div><Banner/></div><QuizBox sx={{ width: "auto", mt: "55vh" }}>{
          quizinfo.map((obj) => {
            return (
              <div className="item" key={obj.quizid}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                  sx={{fontFamily:"Poppins",textTransform:"capitalize",paddingTop:"4px",paddingBottom:"4px"}}
                    title={obj.title}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={`data:image/*;base64,${obj.banner}`}
                    alt="organization"
                  />
                  <Divider/>
                  <CardContent sx={{paddingTop:"4px",paddingBottom:"4px"}}>
                    <Typography sx={{fontFamily:"Poppins",color:"#472183",textTransform:"capitalize"}}>
                      {obj.description}
                    </Typography>
                    <Typography sx={{fontFamily:"Poppins",color:"#472183",textTransform:"capitalize"}} variant="body2">
                        {"Positive Marks: " + obj.positivemarks}
                      </Typography>
                      <Typography sx={{fontFamily:"Poppins",color:"#472183",textTransform:"capitalize"}} variant="body2">
                        {"Negative Marks: " + obj.negativemarks}
                      </Typography>
                  </CardContent>
                  <Divider/>
                  <CardContent sx={{paddingTop:"4px",paddingBottom:"4px"}}>
                    <Typography sx={{fontFamily:"Poppins",textTransform:"capitalize"}}>
                      {handleTags(obj.tags)}
                    </Typography>
                  </CardContent>
                  <Divider/>
                    <CardContent sx={{paddingTop:"4px",paddingBottom:"4px"}}>
                      <Typography sx={{display:'flex'}}>
                        {obj.totalquestions} Questions
                        </Typography>
                        <Typography sx={{display:'flex'}}>
                        {(obj.duration_hrs)*60} Minutes
                        </Typography>
                        <Button variant="outlined" sx={{marginLeft:28,my:"auto"}} onClick={() => handleQuiz(obj)}>
                        {obj.paid==='1'?'Paid':'Free'}
                        </Button>
                      
                      </CardContent>
                      <Divider/>
                      <CardContent sx={{paddingTop:"4px",paddingBottom:"4px",height:"30px"}}>
                      <Typography sx={{fontFamily:"Poppins",color:"#472183",textTransform:"capitalize"}}>
                      <b>{" By: " + obj.author}</b>
                      </Typography>
                    </CardContent>
                  
                </Card>
              </div>
            );
          })
}</QuizBox></div>)
        }
      
    </>
  );
}

export default QuizInfo;
