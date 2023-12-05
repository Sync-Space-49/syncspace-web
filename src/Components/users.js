import React from "react";
import { useAddMemberOrg } from "../hooks/Orgs/useAddMemberOrg";

const Users = ({user}) => {
    const { addMemberOrg } = useAddMemberOrg()

    const onAddMember = async (e) => {
        e.preventDefault()
        await addMemberOrg({
            user_id: user.user_id
        })
    }

    return (
        <div>
            <p>{user.username} is a user of SyncSpace
                <button 
                    className="text-black font-semibold rounded-md m-4 p-2 bg-primary"
                    onClick={ onAddMember }
                    >
                    Add to Organization
                </button>
            </p>
        </div>
    );
};

export default Users;