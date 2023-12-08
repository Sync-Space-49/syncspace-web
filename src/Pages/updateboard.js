import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
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
    <div className="bg-test h-screen justify-center flex">
      <div className="flex flex-col p-8 bg-white h-fit w-fit rounded mt-20 mb-20">
      <div className="flex space-x-1 mb-2 mr-12">
              <Link className="p-1" to={`/organization/${orgId}/${boardId}`}><IoIosArrowBack /></Link>
              <p>Return to {title}</p>
          </div>
      
      <div>
      <h1 className="font-semibold ml-4 mt-4">Edit Board</h1>
        <form onSubmit={ onSubmit }
        className="flex flex-col ml-4 mt-4 space-y-4 w-fit">
            <p>Title</p>
            <input
              className="border border-dark p-1 rounded" 
              placeholder={title} 
              id="title"
              onChange={(e) => setNewTitle(e.target.value)}
              />
            <p>Description</p>
            <input 
              className="border border-dark p-1 rounded"
              placeholder={description} 
              id="description"
              onChange={(e) => setNewDesc(e.target.value)}
              />
            <button type="submit" className="text-dark font-semibold rounded-md p-1 bg-primary">Update</button>
        </form>
        <br />
      </div>
      
      </div>
        
    </div>
  );
};

export default UpdateBoard;