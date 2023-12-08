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
        <div className="flex justify-between ">
            <div>
            <div>
            <p>{user.username}</p>
            </div>
            <div>
            <p className="text-sm">{user.name}</p>
            </div>
            </div>
            <div>
            <button 
                    className="text-black font-semibold rounded-md ml-8 p-1 bg-primary"
                    onClick={ onAddMember }
                    >
                    Add User
            </button>
            </div>
        </div>
    );
};

export default Users;