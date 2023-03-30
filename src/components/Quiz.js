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
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const drawerWidth = 240;
const bdrawerheight = 20;

function Quiz({ quizno, duration, p, n }, props) {
  const { hours, minutes, seconds } = useTimer(duration * 60 * 60 * 1000);
  const { renderQuiz, submitResponse, user, wait } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [temp, setTemp] = useState([]);
  const [index, setIndex] = useState(0);
  const [tray, setTray] = useState({});
  let content = [];
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [instrucFlag, setInstrucFlag] = useState(false);
  const [qsize, setQsize] = useState();
  const [submitData, setSubmitData] = useState({
    quizid: "",
    email: "",
    response: "",
    pmarks: p,
    nmarks: n,
  });

  const quizid = new FormData();
  quizid.append("quizid", quizno);

  const history = useNavigate();
  console.log(quizno);
  useEffect(() => {
    (async () => {
      const data = await renderQuiz(quizid);

      setQuestion(data);
      console.log(question);
    })();
  }, []);

  let size = Object.keys(question).length;

  const provideQuestion = () => {
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
    setSelectedIndex(5);
    setTray(...content);
  };

  const displayQuestion = (e) => {
    if (temp[e.target.value - 1].selected) {
      console.log(temp[e.target.value - 1].selected);
      // if(temp[e.target.value-1].selected===temp[e.target.value-1].choice1)
      if (temp[e.target.value - 1].selected === "a") {
        setSelectedIndex(0);
      }
      if (temp[e.target.value - 1].selected === "b") {
        setSelectedIndex(1);
      }
      if (temp[e.target.value - 1].selected === "c") {
        setSelectedIndex(2);
      }
      if (temp[e.target.value - 1].selected === "d") {
        setSelectedIndex(3);
      }
    } else setSelectedIndex(5);
    var j = e.target.value - 1;
    //temp[e.target.value-1].status="current";
    setIndex(j);
    setTray(temp[j]);

    console.log(tray);
  };

  const review = (e) => {
    temp[index].status = "to-review";
  };
  //////////////////////////
  const next = (e, idx) => {
    if (
      selectedIndex !== 5 &&
      temp[index].status !== "to-review" &&
      idx <= size
    )
      temp[index].status = "answered";
    if (temp[idx + 1].selected) {
      console.log(temp[idx + 1].selected);
      //if(temp[idx+1].selected===temp[idx+1].choice1)
      if (temp[idx + 1].selected === "a") {
        console.log(temp[idx + 1].choice1);
        setSelectedIndex(0);
      }
      if (temp[idx + 1].selected === "b") {
        setSelectedIndex(1);
      }
      if (temp[idx + 1].selected === "c") {
        setSelectedIndex(2);
      }
      if (temp[idx + 1].selected === "d") {
        setSelectedIndex(3);
      }
    } else setSelectedIndex(5);
    var j = idx + 1;
    setIndex(j);
    setTray(temp[j]);
    submit();
    console.log(tray);
  };
  /////////////////////////
  const prev = (e, idx) => {
    // temp[index].status = "answered";
    if (idx >= 0) {
      if (temp[idx].selected) {
        console.log(temp[idx].selected);
        // if(temp[idx].selected===temp[idx].choice1)
        if (temp[idx].selected === "a") {
          console.log(temp[idx].choice1);
          setSelectedIndex(0);
        }
        if (temp[idx].selected === "b") {
          setSelectedIndex(1);
        }
        if (temp[idx].selected === "c") {
          setSelectedIndex(2);
        }
        if (temp[idx].selected === "d") {
          setSelectedIndex(3);
        }
      } else setSelectedIndex(5);
      var j = idx;
      setIndex(j);
      setTray(temp[j]);
    }
  };
  //////////////////////////
  const handleListItemClick = (event, idx) => {
    setSelectedIndex(idx);
    if (idx === 0) {
      //temp[index].selected = temp[index].choice1;
      temp[index].selected = "a";
    }
    if (idx === 1) {
      //temp[index].selected = temp[index].choice2;
      temp[index].selected = "b";
    }
    if (idx === 2) {
      //temp[index].selected = temp[index].choice3;
      temp[index].selected = "c";
    }
    if (idx === 3) {
      //temp[index].selected = temp[index].choice4;
      temp[index].selected = "d";
    }
  };
  /////////////////////////////
  const submit = () => {
    temp[index].status = "answered";
    console.log(temp + user.email);
    setSubmitData({
      ...submitData,
      quizid: quizno,
      email: user.email,
      response: temp,
    });
  };

  useEffect(() => {
    submitResponse(submitData)
      .then((data) => {
        if (!data.success) {
          console.log("Quiz Submitted");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [submitData]);

  ///////////////////////////
  const delayAndGo = (e, path) => {
    e.preventDefault();

    setTimeout(() => history(path, { state: { temp, quizno } }), 300);
  };
  //////////////////////////
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  ///////////////////////
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  /////////////////////////////
  const container =
    window !== undefined ? () => window().document.body : undefined;
  /////////////////////////////////
  return (
    <>
      {instrucFlag ? (
        hours || minutes || seconds ? (
          <div className="quiz-container">
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  {hours}:{minutes}:{seconds}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                anchor="bottom"
                variant="persistent"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: false,
                }}
                sx={{
                  display: { xs: "block", sm: "none" },

                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    height: `${bdrawerheight}vh`,
                  },
                }}
              >
                <Grid container direction="row">
                  <ul
                    style={{ display: "flex"}}
                  >
                    <li style={{margin:"10px",color:"blue"}}> Unattempted</li>

                    <li style={{margin:"10px",color:"#E7B10A"}}> Review</li>

                    <li style={{margin:"10px",color:"green"}}> Answered</li>
                  </ul>
                </Grid>
                <br />
                <Divider />
                <br />
                <div className="qbtn">
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
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                <br/>
                <ul >
                  
                    <li style={{color:"blue"}}> Unattempted</li>
                  

                  
                    <li style={{color:"#E7B10A"}}>Review </li>
                  

                  
                    <li style={{color:"green"}}>Answered</li>
                 
                </ul>
                <br/>
                <Divider />
                <br/>
                <div className="qbtn">
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
              </Drawer>
            </Box>
            <Box
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <div className="columns">
                <Box
                  sx={{
                    height: {
                      xs: `calc(100vh + ${bdrawerheight}vh)`,
                      sm: "100vh",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: {
                        xs: `calc(100vh + ${bdrawerheight}vh)`,
                        sm: "100vh",
                      },
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        fontSize: 20,
                        margin: 3,
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "100px",
                      }}
                    >
                      &nbsp;{tray.questionid}.&nbsp;&nbsp;{tray.desc}
                      {tray.questionimg && (
                        <img
                          src={tray.questionimg}
                          alt="questionImg"
                          style={{ width: 300 }}
                        />
                      )}
                      {tray.choice1img && (
                        <img src={tray.choice1img} alt="questionImg" />
                      )}
                      {tray.choice2img && (
                        <img src={tray.choice2img} alt="questionImg" />
                      )}
                      {tray.choice3img && (
                        <img src={tray.choice3img} alt="questionImg" />
                      )}
                      {tray.choice4img && (
                        <img src={tray.choice4img} alt="questionImg" />
                      )}
                    </Paper>
                    <List component="nav" sx={{ margin: 2 }}>
                      <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#609966",
                            "&:hover": {
                              backgroundColor: "#609966",
                            },
                          },
                        }}
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
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#609966",
                            "&:hover": {
                              backgroundColor: "#609966",
                            },
                          },
                        }}
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
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#609966",
                            "&:hover": {
                              backgroundColor: "#609966",
                            },
                          },
                        }}
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
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#609966",
                            "&:hover": {
                              backgroundColor: "#609966",
                            },
                          },
                        }}
                      >
                        <ListItemText
                          value={tray.choice4}
                          //onClick={save}
                          primary={tray.choice4}
                        />
                      </ListItemButton>
                    </List>
                    <Grid container rowspacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Button
                          className="review"
                          onClick={review}
                          sx={{
                            margin: 1,
                            width: { sm: "150px", xs: "100vw" },
                            height: 50,
                          }}
                          variant="outlined"
                        >
                          Review
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Button
                          className="save"
                          variant="outlined"
                          sx={{
                            margin: 1,
                            width: { sm: "150px", xs: "100vw" },
                            height: 50,
                          }}
                          onClick={(e) => prev(e, index - 1)}
                        >
                          Previous
                        </Button>
                      </Grid>
                      {index + 1 !== qsize ? (
                        <Grid item xs={12} sm={4}>
                          <Button
                            className="save"
                            variant="outlined"
                            sx={{
                              margin: 1,
                              width: { sm: "150px", xs: "100vw" },
                              height: 50,
                            }}
                            onClick={(e) => next(e, index)}
                          >
                            Save & Next
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={4}>
                          <Link
                            to="/"
                            onClick={(e) => delayAndGo(e, "/performance")}
                          >
                            <Button
                              className="save"
                              variant="outlined"
                              sx={{
                                margin: 1,
                                width: { sm: "150px", xs: "100vw" },
                                height: 50,
                              }}
                              onClick={submit}
                            >
                              Save & Finish
                            </Button>
                          </Link>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Box>
              </div>
            </Box>
          </div>
        ) : (
          history("/performance", {
            state: { temp, quizno },
          })
        )
      ) : (
        <div className="instruction">
          <Instruction />
          <Button
            sx={{
              width: 100,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "30px",
            }}
            variant="contained"
            color="error"
            onClick={provideQuestion}
          >
            start
          </Button>
          {/* <Button
            sx={{
              width: 100,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "30px",
            }}
            variant="contained"
            color="error"
            onClick={provideQuestion}
            disabled
          >
            start
          </Button> */}
        </div>
      )}
    </>
  );
}

export default Quiz;
