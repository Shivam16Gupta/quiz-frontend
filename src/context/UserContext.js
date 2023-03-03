import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost/php-auth-api/"
      : "https://word.eduguruji.com/php-auth-api/",
});

export const UserContextProvider = ({ children }) => {
  const [theUser, setUser] = useState(null);
  const [wait, setWait] = useState(false);

  const registerUser = async ({ name, email, password }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("newRegister.php", {
        name,
        email,
        password,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loginUser = async ({ email, password }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setWait(false);
        return { success: 1 };
      }
      setWait(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem("loginToken");
    Axios.defaults.headers.common["Authorization"] = "Bearer " + loginToken;
    Axios.defaults.headers.common["App-Version"] = process.env.REACT_APP_VERSION_APP;
    if (loginToken) {
      const { data } = await Axios.get("getUser.php");
      if (data.success && data.user && data.version) {
        setUser(data.user);
        return;
      } else {
        logout();
        //window.location.reload(true);
      }
      setUser(null);
    }
  };

  const renderQuiz = async ({ num }) => {
    setWait(true);
    try {
      const data = await Axios.post("quizData.php", {
        num,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const QuizInfo = async ({ email }) => {
    setWait(true);
    try {
      const data = await Axios.post("quizInfo.php", {
        email,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const Gallery = async () => {
    setWait(true);
    try {
      const data = await Axios.post("gallery.php");
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const submitResponse = async ({ quizid, email, response }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("submit.php", {
        quizid,
        email,
        response,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const submitPerformance = async ({
    quizid,
    email,
    unattempted,
    review,
    answered,
    score,
  }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("performance.php", {
        quizid,
        email,
        unattempted,
        review,
        answered,
        score,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const viewScore = async ({ email }) => {
    setWait(true);
    try {
      const data = await Axios.post("score.php", {
        email,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const updateProfile = async ({
    name,
        email,
        phone,
        gender,
        dob,
        add,
        city,
        country,
        qualification,
        tags,
  }) => {
    setWait(true);
    try {
      const { data } = await Axios.post("profile.php", {
        name,
        email,
        phone,
        gender,
        dob,
        add,
        city,
        country,
        qualification,
        tags,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        wait,
        user: theUser,
        loggedInCheck,
        logout,
        renderQuiz,
        QuizInfo,
        submitResponse,
        submitPerformance,
        viewScore,
        Gallery,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
