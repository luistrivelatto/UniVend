import React, { Component } from 'react';
import './css/App.css';
import Routes from './components/routes/Routes';
import NavBar from './components/widgets/NavBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Routes />
      </React.Fragment >
    );
  }
}

export default (App);
