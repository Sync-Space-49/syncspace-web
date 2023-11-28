import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import {
  Link
} from "react-router-dom";


const OrgBoards = ({board, org}) => {
  const style = { color: "white" }
  console.log(board)
  console.log(org)

  return (
    <div>
        <div className="flex flex-col w-1/5 border border-dark rounded items-center mr-6 mb-10">
          <div>
            <img className="h-100px w-100px" src="https://s3.us-east-1.wasabisys.com/sync-space/logo/SyncSpace-logo-100w.svg" alt="SyncSpace Mint" />
          </div>

          <div className="bg-test flex justify-between w-full p-2 items-center">
            <Link to={`/organization/${org}/${board.id}`} className="text-white font-semibold">{board.title}</Link>
            <IoSettingsSharp style={style}/>
          </div>
        </div>
    </div>
  );
};

export default OrgBoards;