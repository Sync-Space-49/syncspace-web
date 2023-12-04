import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import ToggleAI from '../ToggleAI/toggleAI';
import { IoIosArrowBack } from "react-icons/io";
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

      // const isAiEnabled = async () => {
      //   let token = await getAccessTokenSilently();

      //   var url = `${serverAddress}/api/organizations/${orgId}/boards/${boardId}`
      // }

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
    <div className="bg-test h-screen flex justify-center">
    <div className="flex flex-col p-6 bg-white h-fit w-4/5 rounded mt-20">
        <div className="flex space-x-1 mb-2">
            <Link className="p-1" to={`/organization/${orgId}`}><IoIosArrowBack /></Link>
            <p>Return to {org.name}</p>
        </div>
        <div className="text-dark text-2xl font-semibold ml-4 mt-4">
            <h1>{board.title}</h1>
        </div> 
        <div className="flex space-x-12">

            <div>
                <div className="mt-4 flex flex-col">
                    <h1 className="ml-4">Board Settings</h1>
                    <Link to={`/organization/${orgId}/${boardId}/update`} className="text-dark font-semibold rounded-md p-3 ml-4 mt-4 w-fit bg-primary">Edit Board</Link>
            
                </div>

                <div className="mt-4">
                    <h1 className="ml-4">Danger Zone</h1>
                    <button className="text-white font-semibold rounded-md m-4 p-2 bg-danger" onClick={deleteBoard} data-name="orgs">Delete Board</button>
                </div>
            </div>

            <div className="mt-4">
              <h1 className="font-semibold">Toggle AI Creation</h1>
              <div className="mt-4">
              <ToggleAI />
              </div>
            </div>

        </div>
    </div>
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
