import {
    Link
  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavLoggedIn from '../NavLoggedIn/navloggedin';
import NavLoggedOut from '../NavLoggedOut/navloggedout';
  
  function Redirect() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    getAccessTokenSilently();

    return (
      <div>
        {isAuthenticated
            ? <NavLoggedIn/>
            : <NavLoggedOut/>
        }  
      </div>
    );
}
  
  export default Redirect;