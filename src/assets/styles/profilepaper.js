import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ProfilePaper = styled(Paper)(() => ({
  "@media(min-width: 1025px) and (max-width:2560px)": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gridColumnGap: "50px",
    gridRowGap: "22px",
    height: "700px",
    width: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "40px",
  },
  "@media(min-width: 768px) and (max-width:1024px)": {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gridColumnGap: "50px",
    gridRowGap: "22px",
    height: "700px",
    padding: "30px",
    backgroundColor: "white",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  "@media(min-width: 320px) and (max-width:426px)": {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  marginBottom: "20px",
  marginTop: "20px",
}));

export default ProfilePaper;
