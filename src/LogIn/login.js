import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="bg-primary w-24 rounded" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;

// // import { useAuth0 } from "@auth0/auth0-react";
// // import React from "react";

// // const LoginButton = () => {
// //   const { loginWithRedirect } = useAuth0();

// //   return <button className="bg-primary w-24 rounded" onClick={() => loginWithRedirect()}>Log In</button>;
// // };

// // export default LoginButton;

// import React from "react";

// import {
//     Link
//   } from "react-router-dom";

// function LogIn() {
//   return (
//     <div className="container mx-auto px-30 bg-gray-200 rounded-xl shadow border p-8 m-10 align-middle flex flex-col w-96">
//         <div className="text-center space-y-4">
//             <img className="content-center" src="https://s3.us-east-1.wasabisys.com/sync-space/logo/SyncSpace-logo-100w.svg" alt="mint" />
//             <h1>SyncSpace</h1>
//             <h2>LogIn</h2>
//         </div>
//         <form className="flex flex-col space-y-2">
//             <div className="flex flex-col">
//                 <label htmlFor="username">Username</label>
//                 <input type="text" name="username" id="username" className="rounded" />
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" id="password" className="rounded" />
//             </div>
            
//             <button type="submit" className="bg-slate-700 w-24 rounded">Log In</button>
//         </form>
//         <div className="text-center space-y-4">
//             <h2>or</h2>
//             <h3 className="underline"><Link to="/signup">Sign Up</Link></h3>   
//         </div> 
//     </div>
//   );
// }

// export default LogIn;
