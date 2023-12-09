import React from "react";

const MembersOrgRoles = ({member}) => {

  return (
    <div className="flex justify-between">
      <div className="space-y-2">
      <div>
            <p>{member.username}</p>
            </div>
            <div>
            <p className="text-sm">{member.name}</p>
            </div>
            <button 
                className="text-white font-semibold rounded-md w-fit p-1 bg-tertiary"
                onClick="#"
            >
            Add Roles
            </button>
      </div>
      <div>
      </div>
    </div>
  );
};

export default MembersOrgRoles;