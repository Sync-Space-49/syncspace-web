import React from "react";
import {
  Link, useMatch
} from "react-router-dom";


const UpdateBoard = () => {
  const match = useMatch("/organization/:orgId/:boardId/update")
  const orgId = match.params.orgId
  const boardId = match.params.boardId

  return (
    <div>
      <p>on update board</p>
      <Link to={`/organization/${orgId}/${boardId}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Cancel Edit</Link>
    </div>
  );
};

export default UpdateBoard;