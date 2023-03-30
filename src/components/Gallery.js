import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
//import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Nav from "./Nav";
import { Link,useLocation } from "react-router-dom";
import QuizBox from "../assets/styles/quizbox.js";
import Banner from "./Banner";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Gallery = () => {
  const {wait, Gallery } = useContext(UserContext);
  const [quizinfo, setQuizinfo] = useState([]);
  const location = useLocation();
   const para=location.state;
   const search=new FormData();
     if(!para){
       search.append('search','%');
       }
       else{
         search.append('search',para);
       }
       
  useEffect(() => {
    
    localStorage.setItem('loginToken',"");
    Gallery(search)
      .then((data) => {
        console.log(data);
        setQuizinfo(data);
      })
      .catch((err) => {
        console.error(err);
        setQuizinfo([]);
      });


  }, [para]);
 
  const handleTags=(e)=>{
    const tag=e.split(',');
  return tag.map((id)=>{
  return <Chip label={id} variant="outlined" />
  });
  }
  
  return (
    <>
      <div>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={wait}
            //onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        <Nav />
        <Banner/>
        <QuizBox sx={{ width: "auto", mt: "55vh" }}>
          {quizinfo.map((obj) => {
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
                        <Link to='/signin'>
                        <Button variant="outlined" sx={{marginLeft:28}}>
                        {obj.paid==='1'?'Paid':'Free'}
                        </Button>
                        </Link>
                      </CardContent>
                      <Divider/>
                      <CardContent sx={{paddingTop:"4px",paddingBottom:"4px",height:"30px"}}>
                      <Typography sx={{fontFamily:"Poppins",color:"#472183",textTransform:"capitalize"}}>
                      <b>{" By: " + obj.author}</b>
                      </Typography>
                    </CardContent>
                  
                </Card>
              </div>
              // <div className="item" key={obj.quizid}>
              //   <Card sx={{ maxWidth: 345 }}>
              //     <CardHeader
              //       action={
              //         <IconButton aria-label="settings">
              //           <MoreVertIcon />
              //         </IconButton>
              //       }
              //       title={obj.title}
              //       //subheader={obj.description}
              //     />
              //     <CardMedia
              //       component="img"
              //       height="194"
              //       image={`data:image/*;base64,${obj.banner}`}
              //       alt="organization"
              //     />
              //     <CardContent>
              //       <Typography variant="body2" color="text.secondary">
              //         {obj.description}
              //       </Typography>
              //       <Typography variant="body2" color="text.secondary">
              //           {"Positive Marks: " + obj.positivemarks}
              //         </Typography>
              //         <Typography variant="body2" color="text.secondary">
              //           {"Negative Marks: " + obj.negativemarks}
              //         </Typography>
              //     </CardContent>
              //     <CardContent>
              //       <Typography variant="body2" color="text.secondary">
              //         {obj.tags}
              //       </Typography>
              //     </CardContent>
              //     <CardContent>
              //       <Typography paragraph>
              //       <Typography variant="body2" color="text.secondary">
              //           {" Author: " + obj.author}
              //         </Typography>
                      
              //         <Link to='/signin'>
              //         <Button
              //           variant="contained"
              //           sx={{ marginLeft: 28 }}
                        
              //         >
              //           {obj.paid==='1'?'Paid':'Free'}
                        
              //         </Button>
              //         </Link>
              //       </Typography>
              //     </CardContent>
              //   </Card>
              // </div>
            );
          })}
        </QuizBox>
      </div>
    </>
  );
};

export default Gallery;
