import React, { useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { serverAddress } from "../index";
import axios from "axios";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { useUpdateOrg } from "../hooks/Orgs/useUpdateOrg";
import { useGetOrgUpdate } from "../hooks/Orgs/useGetOrgUpdate";


const UpdateOrg = () => {
    const {isLoading } = useAuth0(); 

    const { name, description } = useGetOrgUpdate()
    const { updateOrg } = useUpdateOrg()

    const [newName, setNewName] = useState("none")
    const [newDesc, setNewDesc] = useState("none")

    const match = useMatch("/organization/:orgId/update")
    const orgId = match.params.orgId

    const navigate = useNavigate()

    const onSubmit = async (e) => {
      e.preventDefault()
      updateOrg({
        name: name,
        newName: newName,
        description: description,
        newDescription: newDesc
      })
      document.getElementById('name').value = ''
      document.getElementById('description').value = ''
      navigate(`/organization/${orgId}`)
    }

  if (isLoading) {
      return <div>Loading ...</div>;
    }

  return (
    <div>
        <h1>Update {name} Organization</h1>
        <form id="form" onSubmit={ onSubmit }>
            <input 
              placeholder={name} 
              id="name"
              onChange={(e) => setNewName(e.target.value)}
              />
            <input 
              placeholder={description} 
              id="description"
              onChange={(e) => setNewDesc(e.target.value)}
              />
            <button type="submit" className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Submit</button>
        </form>
        <br />
        <Link to={`/organization/${orgId}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Cancel Edit</Link>
    </div>
  );
};

export default UpdateOrg;