import React, { useState } from "react";
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import { useGetBoardUpdate } from "../hooks/Boards/useGetBoardUpdate";
import { useUpdateBoard } from "../hooks/Boards/useUpdateBoard";


const UpdateBoard = () => {
  const { title, description} = useGetBoardUpdate()
  const { updateBoard } = useUpdateBoard()

  const [newTitle, setNewTitle] = useState("none")
  const [newDesc, setNewDesc] = useState("none")

  const match = useMatch("/organization/:orgId/:boardId/update")
  const orgId = match.params.orgId
  const boardId = match.params.boardId

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    updateBoard({
      title: title,
      newTitle: newTitle,
      description: description,
      newDescription: newDesc
    })
    document.getElementById('title').value = ''
    document.getElementById('description').value = ''
    navigate(`/organization/${orgId}/${boardId}`)
  }

  return (
    <div>
      <h1>Update {title} Board</h1>
      <form onSubmit={ onSubmit }>
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
      <Link to={`/organization/${orgId}/${boardId}`} className="text-dark font-semibold rounded-md m-4 p-2 bg-primary">Cancel Edit</Link>
    </div>
  );
};

export default UpdateBoard;