import React from "react";
import { useRemoveMemberOrg } from "../../hooks/Orgs/useRemoveMemberOrg";
import { useAuth0 } from "@auth0/auth0-react";

const MembersOrg = ({member}) => {
  const {user} = useAuth0()
  const { removeMemberOrg } = useRemoveMemberOrg()

  const onRemoveMember = (e) => {
    e.preventDefault()
    removeMemberOrg({
      userID: member.user_id
    })
  }

  const onRemoveUser = (e) => {
    e.preventDefault()
    removeMemberOrg({
      userID: member.user_id
    })
  }

  return (
    <div>
      <p>{member.username} is a member of this organization
        {user.sub == member.user_id 
          ? (
            <button 
              className="text-white font-semibold rounded-md m-4 p-2 bg-danger"
              onClick={ onRemoveUser }
              >
              Leave Organization
            </button>
          )
          : (
            <button 
              className="text-white font-semibold rounded-md m-4 p-2 bg-danger"
              onClick={ onRemoveMember }
              >
              Remove from Organization
            </button>            
          )}
      </p>
    </div>
  );
};

export default MembersOrg;