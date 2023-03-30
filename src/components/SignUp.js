import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { Link as Links } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Nav from "./Nav";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";
import FormHelperText from "@mui/material/FormHelperText";
import jwtDecode from 'jwt-decode';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://word.eduguruji.com">
        eduguruji
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const { registerUser, loginUser, loggedInCheck, wait,Glogin,Gregister } =
    useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  //setKey(process.env.NODE_ENV !== "production"? process.env.REACT_APP_SITE_KEY_DEV : process.env.REACT_APP_SITE_KEY_PROD);

  const handleName = (e) => {
    if (e.target.value.length < 5) {
      setNameErr("Name cannot be less than 5 characters!");
    } else setNameErr("");
  };

  const handleEmail = (e) => {
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailErr("Email Invalid!");
    } else setEmailErr("");
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters");
    } else {
      // validate complexity requirement
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/;
      if (!passwordRegex.test(password)) {
        setPasswordErr(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      } else {
        // validate blacklist check
        const weakPasswords = ["password", "123456789", "qwerty"];
        if (weakPasswords.includes(password)) {
          setPasswordErr("Password is too common or weak");
        } else {
          // validate repeated characters check
          const repeatingRegex = /(.)\1{2}/;
          if (repeatingRegex.test(password)) {
            setPasswordErr(
              "Password contains repeating characters or sequences"
            );
          }
          else{
            setPasswordErr("");
          }
        }
      }
    }
  };

  const handleVerify = (response) => {
    if (response) {
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    for (const value of data.keys()) {
      console.log(value);
    }

    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });

    registerUser(data).then((res) => {
      if (res.success) {
        loginUser(data).then((res) => {
          console.log(res);
          if (res.success) {
            event.target.reset();

            loggedInCheck();
          }
          return;
        });
      }
      else{
        setEmailErr(res.message);
      }
    });
  };

  const handleGsignup=(e)=>{
    const USER_CREDENTIAL = jwtDecode(e.credential);
    console.log(USER_CREDENTIAL.email);
    const data = new FormData();
    data.append('email', USER_CREDENTIAL.email);
    data.append('name', USER_CREDENTIAL.name);
    Gregister(data);
    Glogin(data);
    //loggedInCheck();
  }
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={wait}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <br />
            <GoogleLogin
           onSuccess={handleGsignup}
          onError={() => {
            console.log('Login Failed');
          }}
          />
            <br />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    //autoFocus
                    onChange={handleName}
                    error={nameErr}
                  />
                  <FormHelperText id="Name" sx={{ color: "#d32f2f" }}>
                    {nameErr}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmail}
                    error={emailErr}
                  />
                  <FormHelperText id="email" sx={{ color: "#d32f2f" }}>
                    {emailErr}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                /> */}
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePassword}
                    error={passwordErr}
                  />
                  <FormHelperText id="password" sx={{ color: "#d32f2f" }}>
                    {passwordErr}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <ReCAPTCHA
                  sitekey={
                    process.env.NODE_ENV !== "production"
                      ? process.env.REACT_APP_SITE_KEY_DEV
                      : process.env.REACT_APP_SITE_KEY_PROD
                  }
                  onChange={handleVerify}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isVerified}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Links to="/signin">Already have an account? Sign in</Links>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
