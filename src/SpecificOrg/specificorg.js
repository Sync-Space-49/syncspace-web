import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import OrgBoards from "../OrgBoards/orgboards";

const SpecificOrg = () => {
    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId
    console.log(orgId)

    const navigate = useNavigate()

    const { getAccessTokenSilently } = useAuth0();
    const [org, setOrg] = useState(false) 
    const [boards, setBoards] = useState(false)

    useEffect(()=> {
        getOrg()
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
            
            if (res.data){
                console.log("Retreived organization")
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

    const createBoard = async () => {
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
            getOrg()
          })
          .catch(function (error) {
              console.error(error);
          });
    }    

  return (
    <div> 
        <h1>{org.name}</h1>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteOrg} data-name="orgs">Delete Org</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createBoard} data-name="orgs">Create Board</button>
        <Link to={`/organization/${orgId}/update`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Edit Org</Link>
        <p>hi from specific org</p>
        <p>need to implement first on this page:</p>
        <li>update org</li>
        <li>create board</li>
        <p>need to implement second:</p>
        <li>read members</li>
        <li>assign people to org</li>
        <li>update roles/permissions for org</li>
        <li>toggle enabled ai for entire org</li>
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
