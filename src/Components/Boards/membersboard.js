import React from "react";
import { useRemoveMemberBoard } from "../../hooks/Boards/useRemoveMemberBoard";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const MembersBoard = ({member}) => {
    const { user } = useAuth0()
    const { removeMemberBoard } = useRemoveMemberBoard()

    const navigate = useNavigate()

    const onRemoveMember = (e) => {
        e.preventDefault()
        removeMemberBoard({
            userID: member.user_id
        })
        alert("User has been removed from this board \nPlease refresh the page")
    }

    const onRemoveUser = (e) => {
        e.preventDefault()
        removeMemberBoard({
            user: member.user_id
        })
        alert("You have been removed from this board \nYou'll be redirected to the dashboard")
        navigate('/')
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
                {user.sub == member.user_id
                    ? (
                        <button 
                            className="text-white font-semibold rounded-md p-1 bg-danger"
                            onClick={ onRemoveUser }
                            >
                            Leave Board
                        </button>
                    )
                    : (
                        <button 
                            className="text-white font-semibold rounded-md p-1 bg-danger"
                            onClick={ onRemoveMember }
                            >
                            Remove User
                        </button>)}
            </div>
        </div>
    );
};

export default MembersBoard;