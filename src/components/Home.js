import {useContext } from "react";
import { UserContext } from "../context/UserContext";
//import NavBar from "./NavBar";
import "../assets/styles/home.css";
//import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  const { user} = useContext(UserContext);

  

  return (
    <>
      
      <Nav/>
      <div className="home">
        <div className="img">🧒🏻</div>
        <h1>
          {user.name}
          <br />
          <span>{user.email}</span>
        </h1>
        <div className="quiz">
          {/* <button><Link to="/quiz">Quiz 1</Link></button> */}
        </div>
      </div>
    </>
  );
};

export default Home;
