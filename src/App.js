import './App.css';

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landing from './Landing/landing';
import Nav from './Nav/nav';
import Dashboard from './Dashboard/dashboard';
import Organization from './Organization/organization';
import Profile from './Profile/profile';
import Recent from './Recent/recent';
import LogIn from './LogIn/login';
import SignUp from './SignUp/signup';
import LogOut from './LogOut/logout';
import Redirect from './Redirect/redirect';

function App() {
  return (
    <Router>
      <Redirect/>
      {/* <Nav/> */}
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Redirect/>}/>
          <Route path="/landing" element={<Landing/>} />
          {/* I need to figure out how to make it seperate from when ur logged in using middleware maybe */}
          <Route path="*" element ={<Landing/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/logout" element={<LogOut/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
