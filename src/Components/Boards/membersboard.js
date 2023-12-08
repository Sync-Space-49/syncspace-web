import React from "react";
import { useRemoveMemberBoard } from "../../hooks/Boards/useRemoveMemberBoard";

const MembersBoard = ({member}) => {
    const { removeMemberBoard } = useRemoveMemberBoard()

    const onRemoveMember = (e) => {
        e.preventDefault()
        removeMemberBoard({
        userID: member.user_id
        })
    }

    return (
        <div className="flex justify-between space-x-32">
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
                className="text-white font-semibold rounded-md p-1 bg-danger"
                onClick={ onRemoveMember }
                >
                Remove from Board
                </button>
            </div>
        </div>
    );
};

export default MembersBoard;