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
import LogIn from './LoggedOut/loggedout';
import SignUp from './SignUp/signup';
import LogOut from './LoggedIn/loggedin';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Nav/>
      {/* <Nav/> */}
      <div className="mainContainer">
        <Routes>
          <Route path="/landing" element={<Landing/>} />
          <Route path="*" element ={<Landing/>} />
          {isAuthenticated 
            ?           <Route path="/" element ={<Dashboard/>} />
            :           <Route path="/" element ={<Landing/>} />
          }
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
