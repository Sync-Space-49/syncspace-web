import React from "react";

function Profile() {
  return (
    <div className="flex align-top">
        <div className="flex bg-blue h-24 w-full">        
          <div>
            <div className="rounded-md flex-row bg-success px-3 py-2 text-sm font-medium">
              <p>Profile</p>
            </div>
            <div className="rounded-md flex-row bg-success px-3 py-2 text-sm font-medium">
              <p>Settings</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Profile;
