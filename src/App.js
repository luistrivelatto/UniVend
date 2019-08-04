import React, { Component } from 'react';
import './css/App.css';
import Routes from './components/routes/Routes';
import NavBar from './components/widgets/NavBar';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4caf50',
      main: '#357a38',
      dark: '#6fbf73',
      shade: 500
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
        <NavBar />
        <Routes />
      </React.Fragment >
      </MuiThemeProvider>
    );
  }
}

export default (App);
