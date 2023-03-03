import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import "../assets/styles/quizinfo.css";
import Nav from "./Nav";
//import Login from "./Login";
import { Link } from "react-router-dom";

const Gallery = () => {
  const { Gallery } = useContext(UserContext);
  const [quizinfo, setQuizinfo] = useState([]);
  
  

  useEffect(() => {
    (async () => {
      const data = await Gallery();
      console.log(data);
      setQuizinfo(data.data);
    })();
  },[]);

  
  return (
    <>
      <div>
        <Nav />
        <div className="quizes">
          {quizinfo.map((obj) => {
            return (
              <div className="item" key={obj.quizid}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {obj.quizid}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={obj.subject}
                    subheader={"Maximum Marks: " + obj.maxmarks}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={obj.banner}
                    alt="organization"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {obj.description}
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <Typography paragraph>
                      <Typography variant="body2" color="text.secondary">
                        {"Positive Marks: " + obj.positivemarks}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {"Negative Marks: " + obj.negativemarks}
                      </Typography>
                      <Link to='/login'>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 28 }}
                        
                      >
                        Begin
                      </Button>
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Gallery;
