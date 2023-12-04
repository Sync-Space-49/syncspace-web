import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import OrgBoards from "../OrgBoards/orgboards";
// import { useGetOrg } from "../hooks/useGetOrg";
import { useGetOrgs } from "../hooks/Orgs/useGetOrgs";
import { useGetOrg } from "../hooks/Orgs/useGetOrg";
import { useCreateBoard } from "../hooks/Boards/useCreateBoard";
import { useGetMembersOrg } from "../hooks/Orgs/useGetMembersOrg";
import MembersOrg from "../MembersOrg/membersorg";
import { useGetUsers } from "../hooks/useGetUsers";

const SpecificOrg = () => {
    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId
    console.log(orgId)

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

    const createBoardOld = async () => {
        let token = await getAccessTokenSilently();
        
        var url = `${serverAddress}/api/organizations/${orgId}/boards`
    
        const options = {
          method: 'POST',
          url: url,
          params: { 
            title: 'new board from MJ',
            isPrivate: false
          },
          headers: {
              'Authorization': `Bearer ${token}`
          },
        };  
    
        axios
          .request(options)
          .then(function (res) {
            console.log("Created new board")
            getOrgOld()
          })
          .catch(function (error) {
              console.error(error);
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
    <div> 
        <h1>{name}</h1>
        <h2>{description}</h2>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteOrg} data-name="orgs">Delete Org</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createBoardOld} data-name="orgs">Create Board</button>
        <Link to={`/organization/${orgId}/update`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Edit Org</Link>
        
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

        <p>get members, get users, and get boards works, for some reason .map is no longer a function for these.... i dont really know</p>
        <p>need to implement first on this page:</p>
            <li>create board - something with my postman is wrong</li>
        <p>need to implement second:</p>
            <li>assign people to org - in progress - can see users gotta assign to org</li>
            <li>update roles/permissions for org</li>
            <li>toggle enabled ai for entire org - Kaitlyn completed</li>

        <br />

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

        {users && users.length > 0
            ? (
                users.map((user, i) => {
                    return <p>{user.username}</p>
                })
            )
            : (
                <p>There are no users...... which is an issue cause how am i here</p>
            )}
                
        <br />

        {boards && boards.length > 0 
            ? (
                boards.map((board, i) => {
                    return <OrgBoards board={board} org={orgId} key={i} />
                })
            ) 
            : (
                <h1 className="ion-padding">No boards were found</h1>
            )}
            
    </div>
  );
};

export default SpecificOrg;
