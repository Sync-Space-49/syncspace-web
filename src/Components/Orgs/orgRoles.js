import React from "react";
import { useDeleteRole } from '../../hooks/Orgs/useDeleteRole';

const OrgRoles = ({role}) => {

    const { deleteRole } = useDeleteRole();
    const roleName = role.name
    const roleSplit = roleName.split(":")
    let slicedName
    if (roleSplit.length >= 3) {
        slicedName = roleSplit.slice(2).join(':');
        console.log(slicedName)
    }
  return (
    <div className="flex justify-between">
      <div>
      <div>
        <p><i>Role Name:</i> {slicedName}</p>
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