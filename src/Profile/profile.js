import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;

// import React from "react";

// function Profile() {
//   return (
//     <div className="flex align-top">
//         <div className="flex bg-blue h-24 w-full">        
//           <div>
//             <div className="rounded-md flex-row bg-success px-3 py-2 text-sm font-medium">
//               <p>Profile</p>
//             </div>
//             <div className="rounded-md flex-row bg-success px-3 py-2 text-sm font-medium">
//               <p>Settings</p>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }

// export default Profile;
