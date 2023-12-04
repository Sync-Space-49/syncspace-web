import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import { useGetMembersBoard } from "../hooks/Boards/useGetMembersBoard";

const SpecificBoard = () => {
    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId
    console.log(orgId)
    console.log(boardId)

    const navigate = useNavigate()

    const { membersBoard } = useGetMembersBoard()

    const { getAccessTokenSilently } = useAuth0();
    const [org, setOrg] = useState(false) 
    const [board, setBoard] = useState(false)

    useEffect(()=> {
        getOrg()
        getBoard()
      }, []);

    const getOrg = async () => {
        let token = await getAccessTokenSilently();
        const options = {
            method: 'GET',
            url: `${serverAddress}/api//organizations/${orgId}`,
            headers: { authorization: `Bearer ${token}` }
        }
        
        await axios(options)
            .then(res => {
            setOrg(res.data)
            // console.log(org)
            
            if (res.data){
                console.log("Retreived organization")
            }
            else{
                console.log("this org does not exist?")
            }
            })
            .catch((error) => {
            console.log(error.message);
            });
    }
      
    const getBoard = async () => {
        let token = await getAccessTokenSilently();

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/boards/${boardId}`,
            headers: {
                authorization: `Bearer ${token}`
            },
        }; 

        await axios(options)
            .then(res => {
                setBoard(res.data)
                if (res.data){
                console.log("Retreived ",board.length," boards for the organization named ", org.name)
                }
                else{
                console.log("this org does not have any boards")
                }
            })
            .catch((error) => {
                console.log(error.message);
            });    
    }

      const deleteBoard = async () => {
        let token = await getAccessTokenSilently();
    
        var url = `${serverAddress}/api/organizations/${orgId}/boards/${boardId}`
    
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
            console.log("The board was deleted.");
            navigate(`/organization/${orgId}`)
          })
          .catch(error => {
            console.error('Error deleting resource:', error);
          });
      }  

  return (
    <div> 
        <Link to={`/organization/${orgId}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Back to {org.name}</Link>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteBoard} data-name="orgs">Delete Board</button>
        <Link to={`/organization/${orgId}/${boardId}/update`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Edit Board</Link>

        <p>need to implement on this page:</p>
            <li>update board - hook created, i think something wrong with postman</li>
            <li>read members - hook is created, i think its a postman issue pretty sure i have the wrong url</li>
            <li>assign people to board</li>
            <li>update roles/permissions for board</li>
            <li>toggle ai for this board??</li>

        {/* { membersBoard && membersBoard.length > 0
          ? (
            membersBoard.map((member, i) => {
              return <p>{member.username} is a member of this board</p>
            })
          )
          : (
            <p>This board does not have any members?????</p>
          )} */}

    </div>
  );
};

export default SpecificBoard;
