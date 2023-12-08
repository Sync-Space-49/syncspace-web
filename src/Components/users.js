import React from "react";
import { useAddMemberOrg } from "../hooks/Orgs/useAddMemberOrg";
import { useAuth0 } from "@auth0/auth0-react";
// import { useGetMembersOrgUsers } from "../hooks/Orgs/useGetMembersOrgUsers";
import { useGetMembersOrg } from "../hooks/Orgs/useGetMembersOrg";

const Users = ({ users, isMember }) => {
    const { user } = useAuth0()
    const { addMemberOrg } = useAddMemberOrg()
    // const { membersOrgUsers } = useGetMembersOrgUsers()
    // const { membersOrg } = useGetMembersOrg()
    // console.log(users.username," ", isMember)
    console.log(users)

    const onAddMember = async (e) => {
        e.preventDefault()
        await addMemberOrg({
            user_id: users.user_id
        })
    }

    function usersMembers(){
        if (user.sub === users.user_id){
            return (
                <p>{users.username} is a user of SyncSpace
                    <button 
                        className="text-white font-semibold rounded-md m-4 p-2 bg-dark"
                        disabled
                        >
                        This is the current user
                    </button>
                </p>
            )
        }
        else if (isMember){
            return (
                <p>{users.username} is a user of SyncSpace and a member of the org</p>
            )
        }
        // else if (membersOrg.user_id === users.user_id){
        //     return (
        //         <p>{users.username} is a user of SyncSpace
        //             <button 
        //                 className="text-white font-semibold rounded-md m-4 p-2 bg-dark"
        //                 disabled
        //                 >
        //                 Already in Organization
        //             </button>
        //         </p>
        //     )
        // }
        else {
            return (
                <p>{users.username} is a user of SyncSpace
                    <button 
                        className="text-black font-semibold rounded-md m-4 p-2 bg-primary"
                        onClick={ onAddMember }
                        >
                        Add to Organization
                    </button>
                </p>
            )
        }
    }

    return (
        <div>
            {usersMembers()}
        </div>
    );
};

export default Users;