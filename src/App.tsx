import React from 'react';
import './App.css';
import Login from './Components/LoginComponent/Login';
import Home from './Components/HomeComponent/Home';
import Nav from './Components/NavComponent/Nav';
import ShowUser from './Components/ShowUserComponent/ShowUser';
import { Route, Routes } from 'react-router-dom';
import MyComponent from './Components/CheckComponent/Check';
import Check2 from './Components/Check2Component/check2';
import ViewWrapper from './Components/ViewComponent/View';
class App extends React.Component{
  render(){
    return(
    <>
    <Nav/>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/showUser" element={<ShowUser/>}></Route>
      <Route path="/view/:param" element={<ViewWrapper/>}></Route>
      <Route path="/check" element={<MyComponent/>}></Route>
      <Route path="/check2/:param" element={<Check2/>}></Route>

    </Routes>
    </>
    );
  }
}

export default App;
