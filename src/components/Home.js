import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "../assets/styles/home.css";
import Nav from "./Nav";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Profile from "./Profile";

const drawerWidth = 200;

const Home = (props) => {
  const { user, viewScore } = useContext(UserContext);
  const [score, setScore] = useState("");
  const [profile, setProfile] = useState(false);
  //console.log("env="+process.env.REACT_APP_VERSION_APP);
  useEffect(() => {
    (async () => {
      const data = await viewScore(user);
      //console.log(data);
      setScore(data.data);
    })();
  }, []);
  //console.log('bhalu');
  //console.log(JSON.parse(score[0].data)[0].desc);
  console.log(score);

  const { window } = props;
  const [mobileSideOpen, setMobileOpen] = useState(false);
  ///////////////////////
  const handleSideDrawerToggle = () => {
    setMobileOpen(!mobileSideOpen);
  };
  /////////////////////////////
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleProfile = () => {
    setProfile(true);
    console.log(profile);
  };

  const handleResult = () => {
    setProfile(false);
    console.log(profile);
  };

  return (
    <>
      <Nav />
      <div className="home">
        <Fab
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleSideDrawerToggle}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: { sm: "none" },
          }}
        >
          <AccountCircleIcon />
        </Fab>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileSideOpen}
            onClose={handleSideDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleProfile}>
                <Typography component="div">Profile</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleResult}>
                <Typography component="div">Results</Typography>
              </ListItemButton>
            </ListItem>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                top:"45px"
              }
            }}
            open
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleProfile}>
                <Typography component="div">Profile</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleResult}>
                <Typography component="div">Results</Typography>
              </ListItemButton>
            </ListItem>
          </Drawer>
        </Box>
        {profile ? (
          <Profile />
        ) : (
          
          <>
            {score.length > 0 ? (
              <Box sx={{width:"auto",ml:{sm:"200px",xs:"none"},mt:"4rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Chip
                  label="Can't find your test result? Contact the author to release the result."
                  color="info"
                  variant="outlined"
                  sx={{ marginBottom: "10px",width:"max-content" }}
                />
                <div>
                {score.map((obj) => {
                  return (
                    <div className="results" key={obj.id}>
                      <Accordion
                        sx={{
                          '@media(min-width: 1024px) and (max-width:2560px)' : {
                            width: '1000px'
                          },
                          '@media(min-width: 768px) and (max-width:1024px)' : {
                            width: '800px'
                          },
                          '@media(min-width: 600px) and (max-width:768px)' : {
                            width: '550px'
                          },
                          '@media(min-width: 0px) and (max-width: 320px)' : {
                            width: '315px'
                          },
                          "&": {
                            margin: "1px",
                            borderStyle: "solid",
                            borderColor: "grey",
                            // width:{xs:"315px"}
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            {obj.description}-{obj.author}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="chips">
                          <Chip
                            label={
                              "Unattempted: " +
                              obj.unattempted +
                              "/" +
                              obj.maxmarks
                            }
                            color="error"
                            variant="outlined"
                          />
                          <Chip
                            label={"Review: " + obj.review + "/" + obj.maxmarks}
                            color="warning"
                            variant="outlined"
                          />
                          <Chip
                            label={
                              "answered: " + obj.answered + "/" + obj.maxmarks
                            }
                            color="info"
                            variant="outlined"
                          />
                          <Chip
                            label={"Score: " + obj.score + "/" + obj.maxmarks}
                            color="success"
                            variant="outlined"
                          />
                          </div>
                          <Typography>
                            {JSON.parse(obj.data).map((item) => {
                              return (
                                <div
                                  className="responses"
                                  key={item.questionid}
                                >
                                  <Typography>
                                    {item.questionid}:{item.desc}
                                  </Typography>
                                  <Typography>
                                    <b>Response:</b>
                                    {item.selected ? item.selected : "N/A"}
                                  </Typography>
                                  <Typography>
                                    <b>Correct Answer:</b>
                                    {item.answer}
                                  </Typography>
                                </div>
                              );
                            })}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                })}
                </div>
              </Box>
            ) : (
              <Box sx={{width:"auto",ml:{sm:"200px",xs:"none"},mt:"4rem",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Chip
                label="Find all your test result here. If you can't find your test then
          contact the author to release the result."
                color="success"
                variant="outlined"
              />
              </Box>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
