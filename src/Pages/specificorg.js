import React, { useState } from "react";
import {
  Link, useMatch
} from "react-router-dom";
import ToggleAI from '../Components/toggleAI';
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
        alert("A new board has been created \nPlease refresh the page")
    }

    const membersOrgIDs = []
    membersOrg.forEach((member,i) => {
        membersOrgIDs.push(member.user_id)
    })

    return (
        <div className="bg-test flex justify-evenly">
            <div className="flex flex-col p-8 bg-white h-fit w-fit rounded mt-20 mb-20">
                <div className="flex space-x-1 mb-2">
                    <Link className="p-1" to={`/dashboard`}><IoIosArrowBack /></Link>
                    <p>Return to Dashboard</p>
                </div>
                <div className="text-dark text-2xl font-semibold ml-4 mt-4">
                    <h1>{name}</h1>
                    <h2>{description}</h2>
                </div> 
                <div className="flex space-x-12">
                    <div className="space-y-6">
                        <div className="mt-4 space-y-4">
                            <div>
                                <h1 className="ml-4 font-semibold">Organization Settings</h1>
                            </div>
                            <div>
                                <Link to={`/organization/${orgId}/update`} className="text-dark font-semibold rounded-md ml-4 p-2 bg-primary">Edit Organization</Link>
                            </div>
                            <div>
                                <Link to={`/organization/${orgId}/roles`} className="text-dark font-semibold rounded-md ml-4 p-2 bg-primary">Manage Roles</Link>
                            </div>                            
                        </div>
                        <div className="mt-4 ml-4">
                            <h1 className="font-semibold">Allow AI Creation</h1>
                            <div className="mt-4">
                                <ToggleAI />
                            </div>
                        </div>
                        {/* create board */}
                        <div className="ml-4">
                            <h1 className="mb-2 font-semibold">Create New Board</h1>
                            <form 
                                onSubmit={ onSubmitCreateBoard }
                                className="flex flex-col space-y-4">
                                <input 
                                    className="border rounded border-dark p-1"
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setTitleCreateBoard(e.target.value)}
                                />
                                <input 
                                    className="border rounded border-dark p-1"
                                    type="text" 
                                    placeholder="Description"
                                    onChange={(e) => setDescCreateBoard(e.target.value)}
                                />
                                <button 
                                    type="submit"
                                    className="text-dark font-semibold rounded-md p-1 bg-primary"
                                >Submit</button>
                            </form>
                        </div>


                        <div className="mt-4">
                            <h1 className="ml-4 font-semibold">Danger Zone</h1>
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
            </div>
            <div className="flex flex-col p-8 bg-white h-fit rounded mt-20 mb-20">
            <div>
                <h1 className="text-xl font-semibold">Members</h1>
            </div>
            <div className="mt-4">
                <h2 className="font-semibold">Organization Members</h2>
                <div className="space-y-2 mt-2 mb-2">
                    { membersOrg && membersOrg.length > 0 
                        ? (
                            membersOrg.map((member, i) => {
                            return <MembersOrg member={member} key={i} />
                            })
                        ) 
                        : (
                            <p>This organization does not have any members.</p>
                        )}
                </div>
                <h2 className="font-semibold">SyncSpace Users</h2>
                <div className="space-y-2 mt-2 mb-2">
                    {users && users.length > 0
                        ? (
                            users.map((user, i) => {
                            return <Users users={user} key={i} isMember={membersOrgIDs.includes(user.user_id)}/>
                            })
                        )
                        : (
                            <p>There are no users...... which is an issue cause how am i here</p>
                        )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default SpecificOrg;
