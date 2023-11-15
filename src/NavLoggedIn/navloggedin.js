import {
    Link
  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
  
  function NavLoggedIn() {
    const {user, isAuthenticated} = useAuth0();

    if (isAuthenticated) {
      console.log('logged in ' + user.name);
    } 
    else {
      console.log('error occured');
    }
    return (
        <div className="flex space-x-4">
            <Link to="/dashboard" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
            <Link to="/organization" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Organization</Link>
            <Link to="/profile" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Profile</Link>
            <Link to="/recent" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Recent</Link>
            <Link to="/logout" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">LogOut</Link>
        </div>
    );
}
  
  export default NavLoggedIn;