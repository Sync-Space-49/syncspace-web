import React from "react";
import { useRemoveMemberOrg } from "../../hooks/Orgs/useRemoveMemberOrg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const MembersOrg = ({member}) => {
  const {user} = useAuth0()
  const { removeMemberOrg } = useRemoveMemberOrg()

  const navigate = useNavigate()

  const onRemoveMember = (e) => {
    e.preventDefault()
    removeMemberOrg({
      userID: member.user_id
    })
    alert("User has been removed from this organziation. \nPlease refresh the page")
  }

  const onRemoveUser = (e) => {
    e.preventDefault()
    removeMemberOrg({
      userID: member.user_id
    })
    alert("You have been removed from this organization. \nYou will be redirected to the dashboard.")
    navigate('/')
  }

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
              Remove User
            </button>            
          )}
      </div>
    </div>
  );
};

export default MembersOrg;