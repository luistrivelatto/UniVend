import React from 'react';
import { Menu, MenuItem, IconButton, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Menu"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} component={Link} to="/">Home</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose} component={Link} to="/addProduct">Adicionar Produto</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose} component={Link} to="/listClients">Ver Clientes</MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to="/addClient">Adicionar Cliente</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose} component={Link} to="/logout" >Sair</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
