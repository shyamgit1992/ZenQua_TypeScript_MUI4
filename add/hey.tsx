import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, alpha } from "@material-ui/core/styles";

const styles = (theme: any) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "30ch",
        height: "7ch",
      },
    },
    table: {
      minWidth: 650,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "40rem",
      height: "20rem",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  });

interface MyState {
  data: {
    username: string;
    useremail: string;
    userpassword: string;
  };
  modalData: {
    username: string;
    useremail: string;
    userpassword: string;
  };
  searchval: string;
  open: boolean;
  sid: number;
  modalOpen: boolean;
  val: { username: string; useremail: string; userpassword: string }[];
}

interface myProps {}

class BasicTextFields extends Component<myProps, MyState> {
  constructor(props: myProps) {
    super(props);
    this.state = {
      data: {
        username: "",
        useremail: "",
        userpassword: "",
      },
      modalData: {
        username: "",
        useremail: "",
        userpassword: "",
      },
      searchval: "",
      modalOpen: false,
      val: [],
      sid: 0,
      open: false,
    };
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      data: { ...prevState.data, [e.target.name]: e.target.value },
    }));
  };

  //modal Input
  handleModalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      modalData: { ...prevState.modalData, [name]: value },
    }));
  };

  addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    this.setState({
      val: [...this.state.val, this.state.data],
    });
    this.setState({
      data: {
        username: "",
        useremail: "",
        userpassword: "",
      },
    });
  };

  //delete user
  deleteUser = (index: number) => {
    this.setState((prevState) => ({
      val: prevState.val.filter((item, i) => i != index),
    }));
  };

  //update user
  updateUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("hello");
    const { val, sid } = this.state;
    const updateVal = [...val];
    updateVal[sid] = { ...this.state.modalData };

    this.setState({
      val: updateVal,
      open: false,
    });
  };

  //searching
  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchval: e.target.value });
  };

  requestSearch = () => {
    const filterData = this.state.val.filter((item) => {
      return item.username
        .toLowerCase()
        .includes(this.state.searchval.toLowerCase());
    });

    console.log(
      this.state.val.filter((item) => {
        return item.username
          .toLowerCase()
          .includes(this.state.searchval.toLowerCase());
      }),
      "filterData"
    );

    return filterData;
  };

  //Modal Box
  handleOpen = (id: number) => {
    this.setState({
      sid: id,
      open: true,
      modalData: { ...this.state.val[id] },
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes }: any = this.props;
    const { open } = this.state;

    return (
      <div
        className={`container ${this.state.modalOpen ? "blur-background" : ""}`}
      >
        <div className="row">
          <div className="col-sm-8">
            <div className="alert alert-info">
              <h3>Enter User Details</h3>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="username"
                value={this.state.data.username}
                onChange={this.handleInput}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="useremail"
                value={this.state.data.useremail}
                onChange={this.handleInput}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="userpassword"
                value={this.state.data.userpassword}
                onChange={this.handleInput}
              />
              <Button
                variant="contained"
                onClick={this.addUser}
                color="primary"
              >
                Add User
              </Button>
            </form>
          </div>
          <div className="col-sm-8 mt-4">
            <div className="alert alert-info">
              <h3>All User Details</h3>
            </div>
            <TableContainer component={Paper}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search by name..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={this.handleSearch}
                />
              </div>

              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Email</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Password</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.searchval
                    ? this.requestSearch().map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <div>{item.useremail}</div>
                            <div>{item.username}</div>
                            <div>{item.userpassword}</div>
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => this.deleteUser(index)}
                            >
                              Delete User
                            </button>
                            <button
                              className="btn btn-info btn-sm ml-2"
                              type="button"
                              onClick={() => this.handleOpen(index)}
                            >
                              View
                            </button>
                            <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              className={classes.modal}
                              open={open}
                              onClose={this.handleClose}
                              closeAfterTransition
                              BackdropComponent={Backdrop}
                              BackdropProps={{
                                timeout: 500,
                              }}
                            >
                              <Fade in={open}>
                                <div className={classes.paper}>
                                  <h2 id="transition-modal-title">
                                    User Details
                                  </h2>
                                  <p id="transition-modal-description">
                                    <TextField
                                      className="mr-3 mb-3"
                                      id="outlined-basic"
                                      label="Name"
                                      variant="outlined"
                                      name="username"
                                      value={this.state.modalData.username}
                                      onChange={this.handleModalInput}
                                    />
                                    <TextField
                                      id="outlined-basic"
                                      label="Email"
                                      variant="outlined"
                                      name="useremail"
                                      value={this.state.modalData.useremail}
                                      onChange={this.handleModalInput}
                                    />
                                    <TextField
                                      id="outlined-basic"
                                      label="Password"
                                      variant="outlined"
                                      name="userpassword"
                                      value={this.state.modalData.userpassword}
                                      onChange={this.handleModalInput}
                                    />
                                    <Button
                                      variant="contained"
                                      className="ml-3"
                                      onClick={this.updateUser}
                                      color="primary"
                                    >
                                      Update User
                                    </Button>
                                  </p>
                                </div>
                              </Fade>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))
                    : this.state.val.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item.useremail}
                          </TableCell>
                          <TableCell align="right">{item.username}</TableCell>
                          <TableCell align="right">
                            {item.userpassword}
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => this.deleteUser(index)}
                            >
                              Delete User
                            </button>
                            <button
                              className="btn btn-info btn-sm ml-2"
                              type="button"
                              onClick={() => this.handleOpen(index)}
                            >
                              View
                            </button>
                            <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              className={classes.modal}
                              open={open}
                              onClose={this.handleClose}
                              closeAfterTransition
                              BackdropComponent={Backdrop}
                              BackdropProps={{
                                timeout: 500,
                              }}
                            >
                              <Fade in={open}>
                                <div className={classes.paper}>
                                  <h2 id="transition-modal-title">
                                    User Details
                                  </h2>
                                  <p id="transition-modal-description">
                                    <TextField
                                      className="mr-3 mb-3"
                                      id="outlined-basic"
                                      label="Name"
                                      variant="outlined"
                                      name="username"
                                      value={this.state.modalData.username}
                                      onChange={this.handleModalInput}
                                    />
                                    <TextField
                                      id="outlined-basic"
                                      label="Email"
                                      variant="outlined"
                                      name="useremail"
                                      value={this.state.modalData.useremail}
                                      onChange={this.handleModalInput}
                                    />
                                    <TextField
                                      id="outlined-basic"
                                      label="Password"
                                      variant="outlined"
                                      name="userpassword"
                                      value={this.state.modalData.userpassword}
                                      onChange={this.handleModalInput}
                                    />
                                    <Button
                                      variant="contained"
                                      className="ml-3"
                                      onClick={this.updateUser}
                                      color="primary"
                                    >
                                      Update User
                                    </Button>
                                  </p>
                                </div>
                              </Fade>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BasicTextFields);
