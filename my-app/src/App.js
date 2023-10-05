import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Nav from './Nav/nav';
import Dashboard from './Dashboard/dashboard';
import Organization from './Organization/organization';
import Profile from './Profile/profile';
import Recent from './Recent/recent';

function App() {
  return (
    <Router>
      <Nav/>
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recent" element={<Recent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
