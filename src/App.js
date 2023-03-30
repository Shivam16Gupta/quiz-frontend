import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
//import Login from "./components/Login";
//import Register from "./components/Register";
import Home from "./components/Home";
import QuizInfo from "./components/QuizInfo";
import Performance from "./components/Performance";
import ScopedCssBaseline from "@mui/material/CssBaseline";
import Gallery from "./components/Gallery";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="container">
      <ScopedCssBaseline />
      <BrowserRouter>
        <Routes>
          {user && (
            <>
              <Route path="/" element={<QuizInfo />} />
              <Route path="/home" element={<Home />} />
              <Route path="/performance" element={<Performance />} />
            </>
          )}
          {!user && (
            <>
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}

          <Route path="*" element={<Navigate to={user ? "/" : "/gallery"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
