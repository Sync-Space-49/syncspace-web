import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  // const login = async () => {
  //   await loginWithRedirect()
  // }
  
  // return <button className="bg-primary w-24 rounded" onClick={() => loginWithRedirect()}>Log In</button>;
  // return <button className="bg-primary w-24 rounded" onClick={login}>Log In</button>;
  return <button onClick={() => loginWithRedirect()}>Log In</button>;

};

export default LoginButton;