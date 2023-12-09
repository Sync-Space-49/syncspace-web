import React from "react";
import { useAddMemberOrg } from "../hooks/Orgs/useAddMemberOrg";
import { useAuth0 } from "@auth0/auth0-react";

const Users = ({ users, isMember }) => {
    const { user } = useAuth0()
    const { addMemberOrg } = useAddMemberOrg()

    const onAddMember = async (e) => {
        e.preventDefault()
        await addMemberOrg({
            user_id: users.user_id
        })
        alert("User has been added to this organziation. \nPlease refresh the page")
    }

    function usersMembers(){
        if (user.sub === users.user_id){
            return (
                <button 
                    className="text-white font-semibold rounded-md m-4 p-2 bg-dark"
                    disabled
                    >
                    This is the current user
                </button>
            )
        }
        else if (isMember){
            return (
                <button 
                    className="text-white font-semibold rounded-md m-4 p-2 bg-dark"
                    disabled
                    >
                    In Organization
                </button>
            )
        }
        else {
            return (
                <button 
                    className="text-black font-semibold rounded-md m-4 p-2 bg-primary"
                    onClick={ onAddMember }
                    >
                    Add User
                </button>
            )
        }
    }

    return (
        <div className="flex justify-between">
            <div>
                <div>
                    <p>{users.username}</p>
                </div>
                <div>
                    <p className="text-sm">{users.name}</p>
                </div>
            </div>
            <div>
                {usersMembers()}
            </div>
        </div>
    );
};

export default Users;