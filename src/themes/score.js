import { createTheme } from "@mui/material/styles";
import { amber, deepPurple } from '@mui/material/colors';

const scTheme = createTheme({

    palette: {
  
      primary: {
  
        main: deepPurple[500],
  
      },
  
      secondary: {
  
        main: amber[500],
  
        contrastText: deepPurple[900],
  
      },
  
    },
  
  });
  
  
  
  
  scTheme.props = {
  
    MuiTableCell: { 
  
      size: 'small', 
  
    },
  
  };

  scTheme.overrides = {

    MuiTableCell	: {
  
      head: {
  
        fontSize: 20, // removes uppercase transformation

        backgroundColor:scTheme.palette.primary.main,
  
      }
  
    //   containedPrimary: {
  
    //     '&:hover': { // changes colors for hover state
  
    //       backgroundColor: scTheme.palette.secondary.main,
  
    //       color: scTheme.palette.primary.dark,
  
    //     },
  
    //   },
  
    //   containedSecondary: {
  
    //     fontWeight: 700, // makes text bold
  
    //   },
  
    }
  
  };
  export default scTheme;