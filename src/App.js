import './App.css';

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landing from './Pages/landing';
import Nav from './Components/nav';
import Dashboard from './Pages/dashboard';
import Profile from './Pages/profile';
import DashOrg from './Components/Orgs/dashorg';
import SpecificOrg from './Pages/specificorg';
import UpdateOrg from './Pages/updateorg';
import { useAuth0 } from "@auth0/auth0-react";
import SpecificBoard from './Pages/specificboard';
import UpdateBoard from './Pages/updateboard';
import UpdateRoles from './Pages/updateRoles';

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
          <Route path="/organization/:orgId/roles" element={ <UpdateRoles/>}/>
          <Route path="/organization/:orgId/:boardId" element={<SpecificBoard/>}/>
          <Route path="/organization/:orgId/:boardId/update" element={<UpdateBoard/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
