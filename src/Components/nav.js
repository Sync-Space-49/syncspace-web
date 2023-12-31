import { useAuth0 } from "@auth0/auth0-react";
import LoggedOut from "./loggedout";
import LoggedIn from "./loggedin";
  
  function Nav() {
    const { isAuthenticated } = useAuth0();
    return (
      <nav className="flex nav align-top bg-dark h-16">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center pl-6 space-x-2">
            <img className="h-8 w-auto" src="https://s3.us-east-1.wasabisys.com/sync-space/logo/SyncSpace-logo-100w.svg" alt="SyncSpace Mint" />
            <h1 className="text-white text-xl">SyncSpace</h1>
            <h1 className="text-white font-semibold text-xl">Admin</h1>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {isAuthenticated ? <LoggedIn/>: <LoggedOut/>}
            </div>
          </div>
        </div>
      </nav>
    );
}
  
  export default Nav;