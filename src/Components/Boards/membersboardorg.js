import React from "react";
import { useAddMemberBoard } from "../../hooks/Boards/useAddMemberBoard";
import { useAuth0 } from "@auth0/auth0-react";

const MembersBoardOrg = ({member, isMember}) => {
    const { user } = useAuth0()
    const { addMemberBoard } = useAddMemberBoard()

    const onAddMember = (e) => {
        e.preventDefault()
        addMemberBoard({
            user_id: member.user_id
        })
        alert("User has been added to this board \nPlease refresh the page")
    }

    const orgMembers = () => {
        if (user.sub === member.user_id){
            return (
                <button 
                    className="text-white font-semibold rounded-md p-1 bg-dark"
                    disabled
                    >
                    This is the current user
                </button>
            )
        }
        else if (isMember){
            return (
                <button 
                    className="text-white font-semibold rounded-md p-1 bg-dark"
                    disabled
                    >
                    In Board
                </button>
            )
        }
        else {
            return (
                <button 
                    className="text-black font-semibold rounded-md p-1 bg-primary"
                    onClick={ onAddMember }
                    >
                    Add User
                </button>
            )
        }
    }

    return (
        <div className="flex justify-between mb-4">
            <div>
                <div>
                    <p>{member.username}</p>
                </div>
                <div>
                    <p className="text-sm">{member.name}</p>
                </div>
            </div>
            <div>
                {orgMembers()}
                {/* <button 
                    className="text-black font-semibold rounded-md p-1 bg-primary"
                    onClick={ onAddMember }
                    >
                    Add to Board
                </button> */}
            </div>
        </div>
    );
};

export default MembersBoardOrg;