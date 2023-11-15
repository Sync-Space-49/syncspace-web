import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {
  Link
} from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Link to="/landing" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Landing</Link>
      <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
