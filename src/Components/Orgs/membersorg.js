import React from "react";
import { useRemoveMemberOrg } from "../../hooks/Orgs/useRemoveMemberOrg";

const MembersOrg = ({member}) => {
  const { removeMemberOrg } = useRemoveMemberOrg()

  const onRemoveMember = (e) => {
    e.preventDefault()
    removeMemberOrg({
      userID: member.user_id
    })
  }
  return (
    <div>
      <p>{member.username} is a member of this organization
        <button 
          className="text-white font-semibold rounded-md m-4 p-2 bg-danger"
          onClick={ onRemoveMember }
          >
          Leave Organization
        </button>
      </p>
    </div>
  );
};

export default MembersOrg;