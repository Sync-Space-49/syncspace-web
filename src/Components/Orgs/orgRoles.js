import React from "react";
import { useDeleteRole } from '../../hooks/Orgs/useDeleteRole';

const OrgRoles = ({role}) => {

    const { deleteRole } = useDeleteRole();

    console.log(role)

  return (
    <div className="flex justify-between">
      <div>
      <div>
            <p>{role.name}</p>
            </div>
            <div>
            <p className="text-sm">{role.description}</p>
            </div>
      </div>
      <div>
      <button 
          className="text-white font-semibold rounded-md ml-8 p-1 bg-danger"
          onClick={ deleteRole }
          >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrgRoles;