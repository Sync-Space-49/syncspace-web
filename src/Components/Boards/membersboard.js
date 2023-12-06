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
        <div>
            <p>{member.username} is a member of this board
                <button 
                className="text-white font-semibold rounded-md m-4 p-2 bg-danger"
                onClick={ onRemoveMember }
                >
                Leave Board
                </button>
            </p>
        </div>
    );
};

export default MembersBoard;