import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {
  Link
} from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <Link to="/dashboard" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
      {/* <Link to="/organization" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Org Settings</Link> */}
      <Link to="/profile" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Profile</Link>
      <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>    
    </div>
  );
};

export default LogoutButton;
