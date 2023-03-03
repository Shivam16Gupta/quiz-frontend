import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProfilePaper from "../assets/styles/profilepaper.js";
import { useState,useEffect,useContext,useRef } from "react";
import { UserContext } from "../context/UserContext";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";

const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  const {user,updateProfile}=useContext(UserContext);
    const [text,setText]=useState(user);
    const [profileData,setProfileData]=useState({
        name:user.name,
        email:user.email,
        phone:user.phone,
        gender:user.gender,
        dob:user.dob,
        add:user.address,
        city:user.city,
        country:user.country,
        qualification:user.qualification,
        tags:user.tags,
    });
    console.log(profileData);
    
const onChangeInput = (e) => {
    //setText({...text,[e.target.name]: e.target.value,});
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    console.log(profileData);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleSubmit = async () => {
    setEdit(false);
    console.log(profileData);
    const data = await updateProfile(profileData);
    
  };

  console.log(user);
  return (
    <Box sx={{ width: "auto", ml: { sm: "200px", xs: "none" }, mt: "4rem" }}>
      <ProfilePaper elevation={6}>
      <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Name"
          name="name"
          onChange={onChangeInput}
        //   placeholder={user.name}
        value={profileData.name}
        //onFocus={handleValue}
        
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Email"
          name="email"
          value={user.email}
          variant="outlined"
          disabled
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Phone"
          name="phone"
          value={profileData.phone}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Gender"
          name="gender"
          value={profileData.gender}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
       
       <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Date of Birth(DD/MM/YYYY)"
          name="dob"
          value={profileData.dob}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Address"
          name="add"
          value={profileData.add}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="City"
          name="city"
          value={profileData.city}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Country"
          name="country"
          value={profileData.country}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Qualification"
          name="qualification"
          value={profileData.qualification}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        <TextField
          sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto", }}
          id="outlined-basic"
          label="Tags"
          name="tags"
          value={profileData.tags}
          onChange={onChangeInput}
          variant="outlined"
          disabled={!edit}
        />
        
        {edit ? (
          <Button sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto",width:"218.4px",height:"60px"  }} variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button sx={{ margin: "10px",marginLeft: "auto",
        marginRight: "auto",width:"218.4px",height:"60px" }} variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
        )}
        
      </ProfilePaper>
    </Box>
  );
};

export default Profile;
