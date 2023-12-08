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
            <button 
                className="text-black font-semibold rounded-md p-1 bg-primary"
                onClick={ onAddMember }
                >
                Add to Board
                </button>
            </div>
        </div>
    );
};

export default MembersBoardOrg;