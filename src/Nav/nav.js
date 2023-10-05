import {
    Link
  } from "react-router-dom";
  
  function Nav() {
    return (
      <div className="nav">
        <nav>
          <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/organization">Organization</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/recent">Recent</Link></li>
          </ul>
        </nav>
      </div>
    );
}
  
  export default Nav;