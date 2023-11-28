import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { serverAddress } from "../index";
import { useAuth0 } from "@auth0/auth0-react";

import SpecificOrg from '../DashOrg/dashorg';

// import { useNavigate } from "react-router-dom";

const Organization = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  // const navigate = useNavigate();

  const [orgs, setOrgs] = useState()
  const [boards, setBoards] = useState()
  
  // for some reason needs to be call twice to update, will look into
  const getOrgs = async () => {
    let token = await getAccessTokenSilently();
    const userId = user.sub;
    const options = {
      method: 'GET',
      url: `${serverAddress}/api/users/${userId}/organizations`,
      headers: { authorization: `Bearer ${token}` }
    }
  
    await axios(options)
      .then(res => {
        setOrgs(res.data)
        
        console.log(orgs)
        if (res.data){
          console.log("Retreived ",orgs.length," organizations")
        }
        else{
          console.log("this org does not have any boards")
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const getBoards = async () => {
    let token = await getAccessTokenSilently();

    // need to get index from orgs
    let index = orgs.length-1
    let orgID = orgs[index].id

    const options = {
      method: 'GET',
      url: `${serverAddress}/api/organizations/${orgID}/boards`,
      headers: {
          authorization: `Bearer ${token}`
      },
    }; 

    await axios(options)
    .then(res => {
      setBoards(res.data)
      if (res.data){
        console.log("Retreived ",boards.length," boards for the organization named ", orgs[index].name)
      }
      else{
        console.log("this org does not have any boards")
      }
    })
    .catch((error) => {
      console.log(error.message);
    });    
  }

  const createOrg = async () => {
    let token = await getAccessTokenSilently();
    var url = `${serverAddress}/api/organizations`

    const options = {
      method: 'POST',
      url: url,
      params: { 
        title: 'demo org 3',
        description: 'demo org 3'
      },
      headers: {
          'Authorization': `Bearer ${token}`
      },
    };  

    axios
      .request(options)
      .then(function (res) {
        console.log("Created new organization")
        getOrgs()
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const createBoard = async () => {
    let token = await getAccessTokenSilently();
    // need to grab org id from a specific org
    let index = orgs.length-1
    let orgID = orgs[index].id
    var url = `${serverAddress}/api/organizations/${orgID}/boards`

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
      })
      .catch(function (error) {
          console.error(error);
      });
  }

  const deleteOrg = async () => {
    let token = await getAccessTokenSilently();

    // deletes a specific org
    // need to implement
    const orgID = orgs[0].id
    var url = `${serverAddress}/api/organizations/${orgID}`

    const options = {
      method: 'DELETE',
      url: url,
      params: { 
        title: 'new board from MJ',
        isPrivate: true
      },
      headers: {
          'Authorization': `Bearer ${token}`
      },
      data: {
        ordId: orgID
      }
    };

    axios
      .request(options)
      .then(response => {
        console.log("Organization was deleted. There are now ", orgs.length-1, " organizations.");
      })
      .catch(error => {
        console.error('Error deleting resource:', error);
      });
  }

  const deleteBoard = async () => {
    let token = await getAccessTokenSilently();

    // deletes a specific org
    // need to implement
    let index = orgs.length-1
    let orgID = orgs[index].id
    let boardID = boards[0].id
    console.log(index, orgID, boardID)
    var url = `${serverAddress}/api/organizations/${orgID}/boards/${boardID}`

    const options = {
      method: 'DELETE',
      url: url,
      headers: {
          'Authorization': `Bearer ${token}`
      },
      data: {
        ordId: orgID
      }
    };

    axios
      .request(options)
      .then(response => {
        console.log("A board was deleted. There are now ", boards.length-1," boards.");
      })
      .catch(error => {
        console.error('Error deleting resource:', error);
      });
  }
  
  useEffect(() => {
    getOrgs()
  }, [])

  return (
    <div> 
        {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={getOrgs} data-name="orgs">Get Orgs</button> */}
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createOrg} data-name="orgs">Create Org</button>
        {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteOrg} data-name="orgs">Delete Org</button> */}

        {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={getBoards} data-name="orgs">Get Boards</button> */}
        {/* <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createBoard} data-name="orgs">Create Board</button> */}
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteBoard} data-name="orgs">Delete Board</button>

        {/* {orgs && orgs.length > 0 ? (
          orgs.map((org, i) => {
            return <SpecificOrg org={org} key={i} />;
          })
        ) : (
          <h1 className="ion-padding">No orgs were found</h1>
        )} */}

        <div id="orgs" className="bg-info">
          { user && (
            <h1>{user.username}</h1>
          )}
          {

          }
        </div>

        <div>
          <label for="title">title</label>
          <input type="text" name="title" id="title"/>
        </div>

        <div>
          <label for="description">description</label>
          <input type="text" name="description" id="description"/>
        </div>

        <div>
          <label for="aiEnabled">aiEnabled</label>
          <input type="text" name="aiEnabled" id="aiEnabled"/>
        </div>
    </div>
  );
}

export default Organization;
