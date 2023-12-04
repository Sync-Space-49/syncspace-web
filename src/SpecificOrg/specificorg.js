import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import OrgBoards from "../OrgBoards/orgboards";
import { IoIosArrowBack } from "react-icons/io";
import { useGetOrg } from "../hooks/Orgs/useGetOrg";
import { useCreateBoard } from "../hooks/Boards/useCreateBoard";
import { useGetMembersOrg } from "../hooks/Orgs/useGetMembersOrg";
import { useGetUsers } from "../hooks/useGetUsers";

const SpecificOrg = () => {
    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId
    // console.log(orgId)

    const {name, description} = useGetOrg()
    const { membersOrg } = useGetMembersOrg()
    const { users } = useGetUsers()

    const { createBoard } = useCreateBoard()
    const [titleCreateBoard, setTitleCreateBoard] = useState("none")
    const [descCreateBoard, setDescCreateBoard] = useState("none")

    const navigate = useNavigate()

    const { getAccessTokenSilently } = useAuth0();
    const [org, setOrg] = useState(false) 
    const [boards, setBoards] = useState(false)

    // need until useGetBoards hook is implemented
    useEffect(()=> {
        getOrgOld()
      }, []);
      
    const getOrgOld = async () => {
        let token = await getAccessTokenSilently();
        const options = {
            method: 'GET',
            url: `${serverAddress}/api//organizations/${orgId}`,
            headers: { authorization: `Bearer ${token}` }
        }
        
        await axios(options)
            .then(res => {
            setOrg(res.data)
            
            if (res.data){
                // console.log("Retreived organization")
                getBoards()
            }
            else{
                console.log("this org does not exist?")
            }
            })
            .catch((error) => {
            console.log(error.message);
            });
    }

    const getBoards = async () => {
        let token = await getAccessTokenSilently();

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/boards`,
            headers: {
                authorization: `Bearer ${token}`
            },
        }; 

        await axios(options)
            .then(res => {
                setBoards(res.data)
                console.log(boards)
                if (res.data){
                    console.log("Retreived ",boards.length," boards for the organization named ", org.name)
                }
                else{
                    console.log("this org does not have any boards")
                }
            })
            .catch((error) => {
                console.log(error.message);
            });    
    }
      
    // need to implement hook for this 
    const deleteOrg = async () => {
        let token = await getAccessTokenSilently();

        var url = `${serverAddress}/api/organizations/${orgId}`

        const options = {
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
            ordId: orgId
            }
        };

        axios
            .request(options)
            .then(response => {
            console.log("Organization was deleted.");
            navigate("/")
            })
            .catch(error => {
            console.error('Error deleting resource:', error);
            });
    } 
    
    const onSubmitCreateBoard = async (e) => {
        e.preventDefault()
        createBoard({
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
                    <h1>{org.name}</h1>
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

                <p>need to implement on this page:</p>
                    <li>assign people to org - in progress - can see users gotta assign to org</li>
                    <li>update roles/permissions for org</li>

                <br />

                <h2>Org Members</h2>
                { membersOrg && membersOrg.length > 0 
                    ? (
                        membersOrg.map((member, i) => {
                            return <p>{member.username} is a member of the organization</p>
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
                            return <p>{user.username}</p>
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
