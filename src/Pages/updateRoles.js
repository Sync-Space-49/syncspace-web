import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
    createRoutesFromElements,
  Link, useMatch, useNavigate
} from "react-router-dom";
import { serverAddress } from "../index";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useCreateRole } from '../hooks/Orgs/useCreateRole';

import { useGetOrgRoles } from "../hooks/Orgs/useGetOrgRoles";
import { useGetMembersOrgRoles } from "../hooks/Orgs/useGetMembersOrgRoles";
import MembersOrgRoles from "../Components/Orgs/membersOrgRoles";

const UpdateRoles = () => {

    const match = useMatch("/organization/:orgId/roles")
    const orgId = match.params.orgId

    const { createRole } = useCreateRole();

    const { title, description } = useGetOrgRoles()
    const { membersOrgRoles } = useGetMembersOrgRoles();

    const [newName, setNewName] = useState("none")
    const [newDesc, setNewDesc] = useState("none")

    const onSubmit = async (e) => {
        createRole({
            name: newName,
            description: newDesc
        })

        document.getElementById('name').value = ''
        document.getElementById('description').value = ''
    }

    return (
        <div className="bg-test h-screen justify-center flex">
        <div className="flex flex-col p-8 bg-white h-fit w-4/5 rounded mt-20 mb-20">
        <div className="flex space-x-1 mb-2 mr-6">
                <Link className="p-1" to={`/organization/${orgId}`}><IoIosArrowBack /></Link>
                <p>Return to {title}</p>
        </div>
        
        <div>
        <h1 className="font-semibold text-lg ml-4 mt-4">Manage Member Roles</h1>

        <div>

        <div className="flex space-x-12">
            <div>
            <p className="ml-4 mt-4 font-semibold">Create Roles</p>
        <form onSubmit={ onSubmit }
        className="flex flex-col ml-4 mt-4 space-y-2 w-fit">
            <p>Name</p>
            <input
              className="border border-dark p-1 rounded" 
              placeholder="Role Name" 
              id="name"
              onChange={(e) => setNewName(e.target.value)}
              />
            <p>Description</p>
            <input 
              className="border border-dark p-1 rounded"
              placeholder="Role Description" 
              id="description"
              onChange={(e) => setNewDesc(e.target.value)}
              />
            <button type="submit" className="text-dark font-semibold rounded-md p-1 bg-primary">Create Role</button>
        </form>
            </div>

            <div>
            <div>
                <p className="font-semibold mt-4">Organization Members</p>
            </div>
            <div className="space-y-2 mt-2 mb-2">
                        { membersOrgRoles && membersOrgRoles.length > 0 
                            ? (
                                membersOrgRoles.map((member, i) => {
                                return <MembersOrgRoles member={member} key={i} />
                                })
                            ) 
                            : (
                                <p>This organization does not have any members.</p>
                            )}
                        </div>
            </div>
        </div>
        </div>
        </div>
        
        </div>
          
      </div>

    );
};

export default UpdateRoles;