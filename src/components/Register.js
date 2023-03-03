import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../assets/styles/register.css";

const Register = () => {
  const { registerUser, wait } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // phone: "",
    // gender: "",
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setSuccessMsg(false);
      setErrMsg("Please Fill in all Required Fields!");
      return;
    }

    const data = await registerUser(formData);
    if (data.success) {
      e.target.reset();
      setSuccessMsg("You have successfully registered.");
      setErrMsg(false);
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };

  return (
    <div className="myform">
      <h2>Sign Up</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={onChangeInput}
          placeholder="Your name"
          id="name"
          value={formData.name}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          onChange={onChangeInput}
          placeholder="Your email"
          id="email"
          value={formData.email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={onChangeInput}
          placeholder="New password"
          id="password"
          value={formData.password}
          required
        />
        {/* <label htmlFor="Phone">Phone:</label>
        <input
          type="phone"
          name="Phone"
          onChange={onChangeInput}
          placeholder="Phone(+91)"
          id="phone"
          value={formData.phone}
          required
        />
        <label htmlFor="gender">Gender:</label>

        <label for="male">Male</label>
        <input type="radio" id="male" name="gender" onChange={onChangeInput}
          placeholder="Male"
          
          value={formData.gender}
          required/>

        <label for="female">Female</label>
        <input type="radio" id="female" name="gender" onChange={onChangeInput}
          placeholder="Female"
          
          value={formData.gender}
          required/> */}
        {successMsg && <div className="success-msg">{successMsg}</div>}
        {errMsg && <div className="err-msg">{errMsg}</div>}
        <button type="submit" disabled={wait}>
          Sign Up
        </button>
        <div className="bottom-link">
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
