import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "../assets/styles/instruction.css";

function Instruction() {
    return (
        <div className="instruc_container" >
            <Paper className="instruc" elevation={5} sx={{padding:5,textAlign:'justify'}}>
            <Typography variant="subtitle1" gutterBottom>1. Log in to the exam platform using your credentials.</Typography>

            <Typography variant="subtitle1" gutterBottom>2. Read all instructions carefully before starting the exam. Make sure you understand the format, the time limit, the number of questions, and the marking scheme (negative or positive marking, if applicable).</Typography>

            <Typography variant="subtitle1" gutterBottom>3. Start the exam and allocate enough time for each question. Read the question and all the answer choices carefully.</Typography>

            <Typography variant="subtitle1" gutterBottom>4. Choose the answer that you think is correct and click on the corresponding radio button or checkbox.</Typography>

            <Typography variant="subtitle1" gutterBottom>5. If you are unsure about a question, try to eliminate the obviously incorrect answers and make an educated guess. Be cautious, as some exams have negative marking for incorrect answers.</Typography>

            <Typography variant="subtitle1" gutterBottom>6. Keep an eye on the timer and make sure you allocate enough time for each question. Don't spend too much time on a single question.</Typography>

            <Typography variant="subtitle1" gutterBottom>7. After you have answered all the questions, double-check your answers and make sure you haven't missed any questions.</Typography>

            <Typography variant="subtitle1" gutterBottom>8. If your exam has positive marking, make sure you have answered all questions, even if you are unsure, as you may receive a small number of marks for correct answers.</Typography>

            <Typography variant="subtitle1" gutterBottom>9. Submit your exam once you are satisfied with your answers. You will typically receive your results immediately or within a few hours.</Typography>

            <Typography variant="subtitle1" gutterBottom>10. If there are any technical issues during the exam, contact the exam administrator immediately.</Typography>

            <Typography variant="subtitle1" gutterBottom>11. Good luck and make sure you have prepared well for the exam.</Typography>
            </Paper>
        </div>
    );
}

export default Instruction;