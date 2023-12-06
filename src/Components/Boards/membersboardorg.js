import React from "react";
import { useAddMemberBoard } from "../../hooks/Boards/useAddMemberBoard";

const MembersBoardOrg = ({member}) => {
    const { addMemberBoard } = useAddMemberBoard()

    const onAddMember = (e) => {
        e.preventDefault()
        addMemberBoard({
        user_id: member.user_id
        })
    }

    return (
        <div>
            <p>{member.username} is a member of this organization
                <button 
                className="text-black font-semibold rounded-md m-4 p-2 bg-primary"
                onClick={ onAddMember }
                >
                Add to Board
                </button>
            </p>
        </div>
    );
};

export default MembersBoardOrg;