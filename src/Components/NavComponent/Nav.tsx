import React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { NavLink as RouterNavLink} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';


interface NavProps extends WithStyles<typeof styles> {}

interface NavState {
  anchorEl: null | HTMLElement;
  IsActive : boolean;
  
}

const styles = (theme: Theme) => createStyles({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: "#fff",
    '&:visited': {
      color: 'red', /* Change color to red when link is visited */
    },
    '&:active': {
      color: 'red', /* Change color to red when link is clicked */
    },
    '&:hover': {
      color: 'red', /* Change color on hover (optional) */
    },
  },
  active: {
    color: 'blue',
    fontWeight: 'bold',
  },

});

class Nav extends React.Component<NavProps, NavState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      IsActive : false
    };
    
  }

  handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  setIsActive = () =>{

  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.leftSection}>
            <Typography variant="h6" className={classes.title}>
              Your Logo
            </Typography>
          </div>
          <div className={classes.center}>
          <RouterNavLink to="/home" className={classes.link}>  
              <Button color="inherit">Home</Button>
            </RouterNavLink>
            <Button color="inherit">About</Button>
            <Button color="inherit" onClick={this.handleMenuOpen}>
              Services
            </Button>
            <Menu
              id="services-menu"
              anchorEl={anchorEl}
              keepMounted
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}>Service 1</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Service 2</MenuItem>
            </Menu>
            <Button color="inherit">Contact</Button>
          </div>
          <div>
            <Button color="inherit">Register</Button>
            <RouterNavLink to="/login" className={classes.link}> 
              <Button color="inherit">Login</Button>
            </RouterNavLink>
            <RouterNavLink to="/showUser" className={classes.link}> 
              <Button color="inherit">Show User</Button>
            </RouterNavLink>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Nav);
