import React from "react";

const MembersOrgRoles = ({member}) => {

  return (
    <div className="flex justify-between">
      <div>
      <div>
            <p>{member.username}</p>
            </div>
            <div>
            <p className="text-sm">{member.name}</p>
            </div>
      </div>
      <div>
      <button 
          className="text-white font-semibold rounded-md ml-8 p-1 bg-danger"
          onClick="#"
          >
          Remove User
        </button>
      </div>
    </div>
  );
};

export default MembersOrgRoles;