import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { serverAddress } from "../index";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const userID = user.sub;
  const navigate = useNavigate();
  let orgs = [];
  let boards = []
  
  const getOrgs = async () => {
    // gets the token and permissions -- need for the api call
    let token = await getAccessTokenSilently();

    // creates the url for the api call
    var url = `${serverAddress}/api/users/${userID}/organizations`
    
    // uses axios for the api call
    axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        orgs = res.data;
   
        console.log("Retreived ",orgs.length," organizations")

        // will integrate later
        // // assigns the array of the user's organizations to the orgs array
        // return orgs = res.data;
        
        for (var i=0; i < res.data.length; i++) {
          // this will need to be reworked
          // currently reloads too many times iykyk
          const name = document.createElement("h2")
          name.innerHTML=res.data[i].name;
          document.getElementById("orgs").appendChild(name);
          
          const description = document.createElement("p")
          description.innerHTML=res.data[i].description;
          document.getElementById("orgs").appendChild(description);

          const ai_enabled = document.createElement("p")
          ai_enabled.innerHTML=res.data[i].ai_enabled;
          document.getElementById("orgs").appendChild(ai_enabled);

          // maybe add a button to delete each org
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const getBoards = async () => {
    let token = await getAccessTokenSilently();
    let index = orgs.length-1
    let orgID = orgs[index].id

    var url = `${serverAddress}/api/organizations/${orgID}/boards`

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      boards = res.data
      console.log("Retreived ",boards.length," boards for the organization named ", orgs[index].name)
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
        orgs = res.data;

        console.log("Created new organization")
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const createBoard = async () => {
    let token = await getAccessTokenSilently();
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
        boards = res.data
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
    console.log(index, orgID,boardID)
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
  
  return (
    <div>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={getOrgs} data-name="orgs">Get Orgs</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createOrg} data-name="orgs">Create Org</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteOrg} data-name="orgs">Delete Org</button>

        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={getBoards} data-name="orgs">Get Boards</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={createBoard} data-name="orgs">Create Board</button>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={deleteBoard} data-name="orgs">Delete Board</button>

        <div id="orgs" className="bg-info">

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
