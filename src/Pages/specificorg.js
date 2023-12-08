import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import OrgBoards from "../Components/Orgs/orgboards";
import { IoIosArrowBack } from "react-icons/io";
import { useGetOrg } from "../hooks/Orgs/useGetOrg";
import { useCreateBoard } from "../hooks/Boards/useCreateBoard";
import { useGetMembersOrg } from "../hooks/Orgs/useGetMembersOrg";
import { useGetUsers } from "../hooks/useGetUsers";
import { useGetBoards } from "../hooks/Boards/useGetBoards";
import { useDeleteOrg } from "../hooks/Orgs/useDeleteOrg";
import MembersOrg from "../Components/Orgs/membersorg";
import Users from "../Components/users";

const SpecificOrg = () => {
    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const {name, description} = useGetOrg()
    const { membersOrg } = useGetMembersOrg()
    const { users } = useGetUsers()

    const { boards } = useGetBoards()
    const { deleteOrg } = useDeleteOrg()

    const { createBoard } = useCreateBoard()
    const [titleCreateBoard, setTitleCreateBoard] = useState("none")
    const [descCreateBoard, setDescCreateBoard] = useState("none")
    
    const onSubmitCreateBoard = async (e) => {
        e.preventDefault()
        await createBoard({
            title: titleCreateBoard,
            description: descCreateBoard
        })
    }

    return (
        <div className="bg-test h-screen flex justify-center">
            <div className="flex flex-col p-6 bg-white h-fit w-4/5 rounded mt-20">
                <div className="flex space-x-1 mb-2">
                    <Link className="p-1" to={`/dashboard`}><IoIosArrowBack /></Link>
                    <p>Return to Dashboard</p>
                </div>
                <div className="text-dark text-2xl font-semibold ml-4 mt-4">
                    <h1>{name}</h1>
                </div> 
                <div className="flex space-x-6">

                    <div>
                        <div className="mt-4">
                            <h1 className="ml-4">Organization Settings</h1>
                            {/* if you want me to change create board from a form to a button to another page let me know */}
                            {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createBoard} data-name="orgs">Create Board</button> */}
                            <Link to={`/organization/${orgId}/update`} className="text-dark font-semibold rounded-md m-4 p-3 bg-primary">Edit Organization</Link>
                    
                        </div>

                        <div className="mt-4">
                            <h1 className="ml-4">Danger Zone</h1>
                            <button className="text-white font-semibold rounded-md m-4 p-2 bg-danger" onClick={deleteOrg} data-name="orgs">Delete Organization</button>
                        </div>
                    </div>

                    <div className="w-fit">

                        <div className="mt-4 mb-4">
                            <h1 className="font-semibold">Boards</h1>
                        </div>
                        
                        {boards && boards.length > 0 
                            ? (
                                boards.map((board, i) => {
                                    return <OrgBoards board={board} org={orgId} key={i} />
                                })
                            ) 
                            : (
                                <h1 className="ion-padding">No boards were found.</h1>
                        )}

                    </div>

                </div>
                <h1>{name}</h1>
                <h2>{description}</h2>
                
                <form onSubmit={ onSubmitCreateBoard }>
                    <input 
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setTitleCreateBoard(e.target.value)}
                        />
                    <input 
                        type="text" 
                        placeholder="Description"
                        onChange={(e) => setDescCreateBoard(e.target.value)}
                        />
                    <button 
                        type="submit"
                        className="text-dark font-semibold rounded-md m-4 p-2 bg-primary"
                        >Create Board</button>
                </form>
                
                <br />

                <h2>Org Members</h2>
                { membersOrg && membersOrg.length > 0 
                    ? (
                        membersOrg.map((member, i) => {
                            return <MembersOrg member={member} key={i} />
                        })
                    ) 
                    : (
                        <p>This org does not have any members</p>
                    )}

                <br />
                
                <h2>Auth0 Users</h2>
                {users && users.length > 0
                    ? (
                        users.map((user, i) => {
                            return <Users user={user} key={i}/>
                        })
                    )
                    : (
                        <p>There are no users...... which is an issue cause how am i here</p>
                    )}
            </div>

        </div>
    );
};

export default SpecificOrg;
