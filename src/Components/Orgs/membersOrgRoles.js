import React from "react";

const MembersOrgRoles = ({member}) => {

    const onAddRole = (e) => {
        // e.preventDefault()
        // addMemberRole({
        //   userID: member.user_id
        //   roleID: role.role_id
        // })
        alert("Role Added to User. \nPlease refresh the page")
      }

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
                onClick={ onAddRole }
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