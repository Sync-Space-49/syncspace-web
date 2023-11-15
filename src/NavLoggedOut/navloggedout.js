import {
    Link
  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
  function NavLoggedIn() {
    const {isAuthenticated, user} = useAuth0();

    if (!isAuthenticated) {
      console.log('logged out ');
    } 
    else {
      console.log('this should not run: ' + user.name);
    }
    return (
        <div className="flex space-x-4">
            <Link to="/landing" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Landing</Link>
            <Link to="/login" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">LogIn</Link>
        </div>
    );
}
  
  export default NavLoggedIn;