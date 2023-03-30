import { useState, useContext } from "react";
import { Link as Links } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from "./Nav";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import FormHelperText from "@mui/material/FormHelperText";
//import { googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://word.eduguruji.com/">
        eduguruji
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const { loginUser, wait, loggedInCheck,Glogin,Gregister } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

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
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    loginUser(data).then((res)=>{
      console.log(res);
        if(res.success){
      event.target.reset();
      
      loggedInCheck();}
      else{
        if(res.status===422){
        setEmailErr(res.message);
        setPasswordErr("");
        }
        else{
        setPasswordErr(res.message);
        setEmailErr("");
        }
      }
      return;
  });
  };

  const handleGlogin=(e)=>{
    
    const USER_CREDENTIAL = jwtDecode(e.credential);
    console.log(USER_CREDENTIAL.email);
    const data = new FormData();
    data.append('email', USER_CREDENTIAL.email);
    data.append('name', USER_CREDENTIAL.name);
    Gregister(data);
    Glogin(data);
    //loggedInCheck();
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={wait}
            //onClick={handleClose}
          ><CircularProgress color="inherit" />
          </Backdrop>
      <Nav/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <br/>
          <GoogleLogin
           onSuccess={handleGlogin}
          onError={() => {
            console.log('Login Failed');
          }}
          />
          <br/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailErr}
            />
             <FormHelperText id="email" sx={{ color: "#d32f2f" }}>
                    {emailErr}
                  </FormHelperText>
            <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            
            type={showPassword ? 'text' : 'password'}
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
                  error={passwordErr}
          />
          <FormHelperText id="password" sx={{ color: "#d32f2f" }}>
                    {passwordErr}
                  </FormHelperText>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid item xs={12} sx={{mt:2}}>
              <ReCAPTCHA
                sitekey={process.env.NODE_ENV !== "production"? process.env.REACT_APP_SITE_KEY_DEV : process.env.REACT_APP_SITE_KEY_PROD}
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Links to='/signup'>
                  {"Don't have an account? Sign Up"}
                </Links>
              </Grid>
            </Grid>
          </Box>
        </Box>
               
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Grid></Grid>
    </ThemeProvider>
  );
}