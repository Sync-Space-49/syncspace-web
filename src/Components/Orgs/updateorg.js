import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { useUpdateOrg } from "../../hooks/Orgs/useUpdateOrg";
import { useGetOrgUpdate } from "../../hooks/Orgs/useGetOrgUpdate";


const UpdateOrg = () => {
    const {isLoading } = useAuth0(); 

    const { title, description } = useGetOrgUpdate()
    const { updateOrg } = useUpdateOrg()

    const [newTitle, setNewTitle] = useState("none")
    const [newDesc, setNewDesc] = useState("none")

    const match = useMatch("/organization/:orgId/update")
    const orgId = match.params.orgId

    const navigate = useNavigate()

    const onSubmit = async (e) => {
      e.preventDefault()
      updateOrg({
        title: title,
        newTitle: newTitle,
        description: description,
        newDescription: newDesc
      })
      document.getElementById('title').value = ''
      document.getElementById('description').value = ''
      navigate(`/organization/${orgId}`)
    }

  if (isLoading) {
      return <div>Loading ...</div>;
    }

  return (
    <div>
        <h1>Update {title} Organization</h1>
        <form id="form" onSubmit={ onSubmit }>
            <input 
              placeholder={title} 
              id="title"
              onChange={(e) => setNewTitle(e.target.value)}
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