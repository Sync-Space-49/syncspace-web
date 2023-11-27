import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import {
  Link
} from "react-router-dom";


const DashOrg = ({org}) => {
    const style = { color: "white" }

  return (
    <div>
        <div className="flex flex-col border border-dark rounded items-center mr-6 mb-10">
          <div>
            <img className="h-100px w-100px" src="https://s3.us-east-1.wasabisys.com/sync-space/logo/SyncSpace-logo-100w.svg" alt="SyncSpace Mint" />
          </div>

          <div className="bg-test flex justify-between w-full p-2 items-center">
            <p className="text-white font-semibold">{org.name}</p>
            <IoSettingsSharp style={style}/>
          </div>
          <Link to={`/organization/${org.id}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Visit {org.name}</Link>
        </div>
    </div>
  );
};

export default DashOrg;