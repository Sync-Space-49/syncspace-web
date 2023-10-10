import {
    Link
  } from "react-router-dom";
  
  function Nav() {
    return (
      <div className="nav align-top container mx-auto bg-slate-700">
        <nav>
          <div className="flex flex-row justify-start">
            <img src="./SyncSpace-mint.png" alt="SyncSpace Mint" />
            <h1>SyncSpace</h1>
          </div>
          <ul className="flex flex-row justify-end space-x-4">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/organization">Organization</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/recent">Recent</Link></li>
              <li><Link to="/login">LogIn</Link></li>
              <li><Link to="/signup">SignUp</Link></li>
          </ul>
        </nav>
      </div>
    );
}
  
  export default Nav;