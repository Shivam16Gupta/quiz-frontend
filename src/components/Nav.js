import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import {useContext,useState} from 'react';
import {UserContext} from '../context/UserContext';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/edulogo.png';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const {logout,user} = useContext(UserContext);
  const history = useNavigate();
  const navItems = user?([
    {
      title:'Dashboard',
      link:'/home',
      func:''
    }, 
    {
      title:'Quiz',
      link:'/',
      func:''
    }, 
    {
      title:'Logout',
      link:'/',
      func:logout
    }
  ]):([
    {
    title:'Login',
    link:'/signin',
    func:''
  },
  {title:'Signup',
    link:'/signup',
    func:''
}
]);
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2,fontFamily:"'Poppins'",fontWeight:"1000" }}>
        {/* <Link style={{ textDecoration:'none !important' }} to={user ? "/quizinfo" : "/gallery"}><img src={logo} style={{height:"40px"}} alt='logo'/></Link> */}
        <Link style={{ textDecoration:'none !important' }} to={user ? "/quizinfo" : "/gallery"}>{process.env.REACT_APP_TITLE}</Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.func}>
              
              <ListItemText><Link style={{ textDecoration:'none !important' }} to={item.link}>{item.title}</Link></ListItemText>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  
  // const handlePage=()=>{
  //   history(user?'/quizinfo':'/gallery',{state:term});
  // }

  const handleSearch=(e)=>{
    if(e.key==='Enter'){
    //setTerm(prevTerm=>{return e.target.value});
    const term="%"+e.target.value+"%";
    //console.log(para);
    history(user?'/':'/gallery',{state: term});
    }
  }
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar component="nav">
        <Toolbar sx={{justifyContent: "space-between",'@media (min-width:600px)':{minHeight:"45px"},}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1,fontFamily:"'Poppins'",fontWeight:"1000", display: { xs: 'none', sm: 'block' } }}
          >
            {/* <Link style={{ color: '#FFF' }} to={user ? "/quizinfo" : "/gallery"}><img src={logo} style={{height:"40px"}} alt='logo'/></Link> */}
            {/* <Link style={{ color: '#FFF' }} to={user ? "/quizinfo" : "/gallery"}>{process.env.REACT_APP_TITLE}</Link> */}
            <Link style={{ color: '#FFF' }} to={user ? "/quizinfo" : "/gallery"}><img src={logo} style={{height:"30px",marginTop:"5px"}} alt='logo'/></Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              name='search'
              //onFocus={handlePage}
              onKeyDown={handleSearch}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item,index) => {
              console.log(item);
            return(
              <Link style={{ textDecoration:'none' }} to={item.link}>
              <Button key={index} sx={{ color: '#fff' }} onClick={item.func}>
                <div>{item.title}</div>
              </Button></Link>);}
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
  );
}



export default Nav;