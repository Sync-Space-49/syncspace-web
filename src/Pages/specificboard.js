import React from "react";
import {
  Link, useMatch
} from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useDeleteBoard } from "../hooks/Boards/useDeleteBoard";
import { useGetBoard } from "../hooks/Boards/useGetBoard";
import { useGetOrgBoard } from "../hooks/Orgs/useGetOrgBoard";
import { useGetMembersBoard } from "../hooks/Boards/useGetMembersBoard";
import { useGetMembersOrgBoard } from "../hooks/Orgs/useGetMembersOrgBoard";
import MembersBoard from "../Components/Boards/membersboard";
import MembersBoardOrg from "../Components/Boards/membersboardorg";

const SpecificBoard = () => {
  const match = useMatch("/organization/:orgId/:boardId")
  const orgId = match.params.orgId
  const boardId = match.params.boardId

  const { name} = useGetOrgBoard()
  const { deleteBoard } = useDeleteBoard()
  const { title, description } = useGetBoard()
  const { membersBoard } = useGetMembersBoard()
  const { membersOrgBoard } = useGetMembersOrgBoard()

  const membersBoardIDs = []
  membersBoard.forEach((member,i) => {
    membersBoardIDs.push(member.user_id)
  })

  return (
    <div className="bg-test h-screen flex justify-evenly">
      <div className="flex flex-col p-6 bg-white h-fit w-fit rounded mt-20 mb-20">
          <div className="flex space-x-1 mb-2 mr-6">
              <Link className="p-1" to={`/organization/${orgId}`}><IoIosArrowBack /></Link>
              <p>Return to {name}</p>
          </div>
          <div className="text-dark text-2xl font-semibold ml-4 mt-4">
              <h1>{title}</h1>
              <h2>{description}</h2>
          </div> 
          <div className="flex space-x-12">

              <div>
                  <div className="mt-4 flex flex-col">
                      <h1 className="ml-4 font-semibold">Board Settings</h1>
                      <Link to={`/organization/${orgId}/${boardId}/update`} className="text-dark font-semibold rounded-md p-1 ml-4 mt-4 text-center bg-primary">Edit Board</Link>
              
                  </div>

                  <div className="mt-4">
                      <h1 className="ml-4 font-semibold">Danger Zone</h1>
                      <button className="text-white font-semibold rounded-md m-4 p-2 bg-danger" onClick={deleteBoard} data-name="orgs">Delete Board</button>
                  </div>
              </div>

          </div>

      </div>  

      <div className="flex flex-col p-6 bg-white h-fit w-fit rounded mt-20 mb-20">


        <div>
          <h1 className="font-semibold text-lg mb-4">Manage Members</h1>
        </div>

      <div>
              <h2 className="font-semibold mb-2">Board Members</h2>
            { membersBoard && membersBoard.length > 0 
              ? (
                membersBoard.map((member, i) => {
                  return <MembersBoard member={member} key={i}/>
                })
              )
              : (
                  <p>This organization does not have any members.</p>
                )}
            <h2 className="font-semibold mb-2">Organization Members</h2>
            { membersOrgBoard && membersOrgBoard.length > 0
              ? (
                membersOrgBoard.map((member, i) => {
                  return <MembersBoardOrg member={member} key={i} isMember={membersBoardIDs.includes(member.user_id)}/>
                })
              )
              : (
                <p>This section is loading</p>
              )}
              </div>
      </div>      
    </div>
  );
};

export default SpecificBoard;
