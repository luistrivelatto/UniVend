import React, { Component } from 'react'
import {
  AppBar, Toolbar, Typography, withStyles
} from '@material-ui/core/';
import NavBarMenu from './NavBarMenu';
import styles from './NavBar.style';

class NavBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" className={classes.grow}>
              UniVend
            </Typography>
            <NavBarMenu />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar);
