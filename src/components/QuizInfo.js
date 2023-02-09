import React from 'react';
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Quiz from "./Quiz";

function QuizInfo(props) {
    const { QuizInfo } = useContext(UserContext);
    const [quizinfo,setQuizinfo]=useState([]);

    useEffect(() => {
        (async () => {
          const data = await QuizInfo();
            //console.log(data);
          setQuizinfo(data.data);
        })();
        
      }, [QuizInfo]);
      
      const handleQuiz=()=>{
        return <Quiz/>;
      }
      //console.log(quizinfo);
    return (
        <div>
            hello world
            {
                quizinfo.map((obj)=>{

                return (<div key={obj.quizid}>
                    {obj.subject}
                    <button onClick={handleQuiz}>Start</button>
                </div>);
})
            }
        </div>
    );
}

export default QuizInfo;