import React from "react";
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  const {logout} = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="btn">
        <input id="dropdown" className="input-box" type="checkbox" />

        <label for="dropdown" className="dropdown">
          <span className="hamburger">
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </span>
        </label>
        <div id="logo">
          <img src={logo} alt="logo"></img>
        </div>
      </div>
      <div className="elements">
        <div><Link to="/">Profile</Link></div>
        <div><Link to="/quiz">Quiz</Link></div>
        <div>Report Problem</div>
        <div>About Us</div>
        <div onClick={logout}>Log Out</div>
      </div>
    </div>
  );
}

export default NavBar;
