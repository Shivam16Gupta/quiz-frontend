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
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'

const drawerWidth = 240;


function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {logout,user} = useContext(UserContext);

  const navItems = user?([
    {
      title:'Dashboard',
      link:'/',
      func:''
    }, 
    {
      title:'Quiz',
      link:'/quizinfo',
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
    link:'/login',
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
      <Typography variant="h6" sx={{ my: 2 }}>
        {process.env.REACT_APP_TITLE}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.func}>
              
              <ListItemText><Link to={item.link}>{item.title}</Link></ListItemText>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar component="nav">
        <Toolbar sx={{'@media (min-width:600px)':{minHeight:"45px"}}}>
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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {process.env.REACT_APP_TITLE}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item,index) => {
              console.log(item);
            return(
              <Link to={item.link}>
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