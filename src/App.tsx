import React from 'react';
import './App.css';
import Login from './Components/LoginComponent/Login';
import Home from './Components/HomeComponent/Home';
import Nav from './Components/NavComponent/Nav';
import ShowUser from './Components/ShowUserComponent/ShowUser';
import { Route, Routes } from 'react-router-dom';
class App extends React.Component{
  render(){
    return(
    <>
    <Nav/>
    <Routes>
    <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/showUser" element={<ShowUser/>}></Route>
    </Routes>
    </>
    );
  }
}

export default App;
