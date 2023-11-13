// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";

// const DashboardLogIn = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button className="bg-primary w-24 rounded" onClick={() => loginWithRedirect()}>Log In</button>;
// };

// export default DashboardLogIn;

import React from "react";

function Dashboard() {
  return (
    <div>
        <p>Dashboard</p>
        
        <div className="bg-light w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-dark w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-primary w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-secondary w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-tertiary w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-blue w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-black w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-success w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-info w-24 rounded">
          <p> Log In</p>
        </div>
        <div className="bg-danger w-24 rounded">
          <p> Log In</p>
      </div>
    </div>
  );
}

export default Dashboard;
