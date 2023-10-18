import {
    Link
  } from "react-router-dom";
  
  function Nav() {
    return (
      <nav className="flex nav align-top container mx-auto bg-dark h-16">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-8 w-auto" src="/SyncSpace-mint.png" alt="SyncSpace Mint" />
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link to="/landing" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Landing</Link>
              <Link to="/" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
              <Link to="/organization" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Organization</Link>
              <Link to="/profile" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Profile</Link>
              <Link to="/recent" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Recent</Link>
              <Link to="/login" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">LogIn</Link>
              <Link to="/signup" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">SignUp</Link>
            </div>
          </div>
        </div>
      </nav>
    );
}
  
  export default Nav;