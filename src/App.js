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
import Organization from './Organizations/organizations';
import Profile from './Profile/profile';
import LogIn from './LoggedOut/loggedout';
import SignUp from './SignUp/signup';
import LogOut from './LoggedIn/loggedin';
import DashOrg from './DashOrg/dashorg';
import SpecificOrg from './SpecificOrg/specificorg';
import UpdateOrg from './UpdateOrg/updateorg';
import { useAuth0 } from "@auth0/auth0-react";
import SpecificBoard from './SpecificBoard/specificboard';
import UpdateBoard from './UpdateBoard/updateboard';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Nav/>
      <div className="mainContainer">
        <Routes>
          <Route path="/landing" element={<Landing/>} />
          <Route path="*" element ={<Landing/>} />
          {isAuthenticated 
            ?           <Route path="/" element ={<Dashboard/>} />
            :           <Route path="/" element ={<Landing/>} />
          }
          <Route path="/dashorg" element={<DashOrg/>}/>
          <Route path="/organization/:orgId" element={<SpecificOrg/>}/>
          <Route path="/organization/:orgId/update" element={ <UpdateOrg/>}/>
          <Route path="/organization/:orgId/:boardId" element={<SpecificBoard/>}/>
          <Route path="/organization/:orgId/:boardId/update" element={<UpdateBoard/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/logout" element={<LogOut/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
