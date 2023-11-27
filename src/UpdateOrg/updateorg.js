import React, { useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { serverAddress } from "../index";
import axios from "axios";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";


const UpdateOrg = () => {
    const { getAccessTokenSilently, isLoading } = useAuth0();

    const [org, setOrg] = useState() 

    const match = useMatch("/organization/:orgId/update")
    const orgId = match.params.orgId
    console.log(orgId)

    const navigate = useNavigate()

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
          console.log(org)
          
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

    const updateOrg = async (name, description) => {

        const body = new FormData();
        body.append('name', name);
        body.append('description', description)
        console.log(body)

        let token = await getAccessTokenSilently();
        
        var url = `${serverAddress}/api/organizations/${orgId}`
    
        const options = {
          method: 'PUT',
          url: url,
          headers: {
              'Authorization': `Bearer ${token}`
          },
          data: body
        };  
    
        await axios
          .request(options)
          .then(function (res) {
            console.log("Updated org")
            navigate(`/organization/${orgId}`)
          })
          .catch(function (error) {
              console.error(error);
          });
    }

    if (isLoading) {
        return <div>Loading ...</div>;
      }

  return (
    <div>
        <h1>on edit Org</h1>
        <Link to={`/organization/${orgId}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Cancel Edit</Link>
        <form id="form">
            <input placeholder="{org.name}" id="name"></input>
            <input placeholder="{org.description}" id="description"></input>
            <button type="submit" value="submit" onClick={()=>{
              updateOrg(document.getElementById("name"),document.getElementById("description"))
            }}>Submit</button>
        </form>
        <div id="output">

        </div>
    </div>
  );
};

export default UpdateOrg;