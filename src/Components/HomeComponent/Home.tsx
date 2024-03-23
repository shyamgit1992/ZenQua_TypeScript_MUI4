import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl,FormHelperText } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


// Define styles as a TypeScript interface
const styles = (theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  error: {
    color: 'red',
  },
});

// Define props as a TypeScript interface extending WithStyles
interface HomeProps extends WithStyles<typeof styles> { }
interface User {
  uid:string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  password: string;
  showPassword: boolean;
  uList: any[];
  errors: {
    [key: string]: string;
  };
}
interface State {
  uid : string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  password: string;
  showPassword: boolean;
  uList: User[];
  errors: {
    [key: string]: string;
  };
}

// Create class-based component

class Home extends Component<HomeProps,User,State> {
  constructor(props: any) {
    super(props);
    this.state = {
      uid :'',
      name: '',
      email: '',
      mobile: '',
      gender: '',
      password: '',
      showPassword: false,
      uList: [], // Initialize rows in the state
      errors: {},
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errors = { ...this.state.errors };
  
    // Validate inputs
    switch (name) {
      case 'name':
        errors.name = value.length < 3 ? 'Name must be at least 3 characters long!' : '';
        break;
      case 'email':
        errors.email = !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address!' : '';
        break;
      case 'mobile':
        errors.mobile = value.length !== 10 || isNaN(Number(value)) ? 'Mobile number must be 10 digits!' : '';
        break;
      case 'gender':
        errors.gender = value ? '' : 'Please Select Gender!'; // Update this line
        break;  
      case 'password':
        errors.password = value.length < 6 ? 'Password must be at least 6 characters long!' : '';
        break;
      default:
        break;
    }
    
    // Define the partial state update
    const stateUpdate: Partial<State> = {
      [name]: value,
      errors: { ...errors }
    };
  
    // Update the state
    this.setState(prevState => ({
      ...prevState,
      ...stateUpdate
    }));
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  theme = createTheme({
    palette: {
      primary: green,
    },
  });

  handleEdit = (params: any) => {
    const { uList } = this.state;
    const { id, field, value } = params;
    
    // Find the user by id
    const userIndex = uList.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      // Update the specific field of the user
      const updatedUser = { ...uList[userIndex], [field]: value };
      
      // Update the state with the modified user list
      this.setState(prevState => ({
        uList: [
          ...prevState.uList.slice(0, userIndex), // items before the updated item
          updatedUser,
          ...prevState.uList.slice(userIndex + 1), // items after the updated item
        ]
      }));
    }
    console.log(this.state.uList);
  };
  


  handleDelete(params: any) {
    const { uList } = this.state;
    const updatedList = [...uList];
    updatedList.splice(params, 1); // Remove 1 element at rowIndex
    this.setState({ uList: updatedList });
  
  }

  columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'UID', headerName: 'UID', width: 100 },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'Mobile',
      headerName: 'Mobile',
      type: 'string',
      width: 120,
      editable: true,
    },
    {
      field: 'Gender',
      headerName: 'Gender',
      type: 'string',
      width: 130,
      editable: true,
    },
    {
      field: 'Password',
      headerName: 'Password',
      type: 'string',
      width: 140,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button variant="outlined" color="primary" size="small" onClick={() => this.handleEdit(params)}>Edit</Button>
          &nbsp;
          <Button variant="outlined" color="secondary" size="small" onClick={() => this.handleDelete(params)}>Delete</Button>
        </div>
      )
    },
  ];

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, mobile, gender, password, uList } = this.state;

    // Validate all inputs
    const errors = {
      name: name.length < 3 ? 'Name must be at least 3 characters long!' : '',
      email: !/\S+@\S+\.\S+/.test(email) ? 'Invalid email address!' : '',
      mobile: mobile.length !== 10 || isNaN(Number(mobile)) ? 'Mobile number must be 10 digits!' : '',
      gender: gender!=='' ? '' : 'Please Select Gender!',
      password: password.length < 6 ? 'Password must be at least 6 characters long!' : '',
    };

    // If there are errors, set the state with errors
    if (Object.values(errors).some(error => error !== '')) {
      this.setState({ errors: errors });
    } else {
      // If there are no errors, proceed with form submission
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
      const userData = {
        id: uList.length + 1,
        uid : result,
        name: name,
        email: email,
        mobile: mobile,
        gender: gender,
        password: password
      }
      this.setState(prevState => ({
        uList: [...prevState.uList, userData]
      }));
      this.setState({
        uid : '',
        name : '',
        email : '',
        mobile : '',
        gender : '',
        password : '',
        
      })
    }
  }
  
  render() {
    const { classes } = this.props;
    const { name, email, mobile, gender, password, showPassword, uList, errors } = this.state;
    
    const rowsx = uList.map((user, index) => ({
      id: index + 1,
      UID : user.uid,
      Name: user.name,
      Email: user.email,
      Mobile: user.mobile,
      Gender: user.gender,
      Password: user.password
    }));
    return (
      <center>
        <h3>Register</h3>
        <hr />
        <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="component-outlined-name"
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={this.handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <br />
          <TextField
            id="component-outlined-email"
            label="Email"
            variant="outlined"
            type='email'
            name="email"
            value={email}
            onChange={this.handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <br />
          <TextField
            id="component-outlined-mobile"
            label="Mobile"
            variant="outlined"
            name="mobile"
            value={mobile}
            onChange={this.handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
          <br />
          <FormControl component="fieldset" error={!!errors.gender}>
  <FormLabel component="legend">Gender</FormLabel>
  <RadioGroup
    aria-label="gender"
    name="gender"
    value={gender}
    onChange={this.handleChange}
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
  
  {errors.gender && (
    <FormHelperText>{errors.gender}</FormHelperText>
    
  )}
</FormControl>
          <br />
          <FormControl variant="outlined">
  {/* <InputLabel htmlFor="component-outlined-password">Password</InputLabel> */}
  <TextField
    id="component-outlined-password"
    type={showPassword ? 'text' : 'password'}
    value={password}
    name="password"
    variant='outlined'
    onChange={this.handleChange}
    error={!!errors.password}
    helperText={errors.password ? "Incorrect entry." : ""}
    label="Password"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={this.handleClickShowPassword}
            onMouseDown={this.handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</FormControl>
          <br />
          <ThemeProvider theme={this.theme}>
            <Button variant="contained" color="primary" type="submit" className={classes.margin}>
              Register
            </Button>
          </ThemeProvider>
        </form>
        <hr />
        <center><h3>User List</h3></center>
        <hr/>
        <div style={{ height: 400, width: 1050 }}>
          <DataGrid
            rows={rowsx}
            columns={this.columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            
          />
        </div>
      </center>
    );
  }
}

// Apply styles using withStyles HOC
export default withStyles(styles)(Home);
