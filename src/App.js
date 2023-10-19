import './App.css';

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

function App() {
  return (
    <Router>
      <Nav/>
      <div className="mainContainer">
        <Routes>
          <Route path="/landing" element={<Landing/>} />
          {/* I need to figure out how to make it seperate from when ur logged in using middleware maybe */}
          <Route path="*" element ={<Landing/>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
