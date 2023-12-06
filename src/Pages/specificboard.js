import React from "react";
import {
  Link, useMatch
} from "react-router-dom";
import ToggleAI from '../Components/toggleAI';
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
  const { title } = useGetBoard()
  const { membersBoard } = useGetMembersBoard()
  const { membersOrgBoard } = useGetMembersOrgBoard()

  return (
    <div className="bg-test h-screen flex justify-center">
      <div className="flex flex-col p-6 bg-white h-fit w-4/5 rounded mt-20">
          <div className="flex space-x-1 mb-2">
              <Link className="p-1" to={`/organization/${orgId}`}><IoIosArrowBack /></Link>
              <p>Return to {name}</p>
          </div>
          <div className="text-dark text-2xl font-semibold ml-4 mt-4">
              <h1>{title}</h1>
          </div> 
          <div className="flex space-x-12">

              <div>
                  <div className="mt-4 flex flex-col">
                      <h1 className="ml-4">Board Settings</h1>
                      <Link to={`/organization/${orgId}/${boardId}/update`} className="text-dark font-semibold rounded-md p-3 ml-4 mt-4 w-fit bg-primary">Edit Board</Link>
              
                  </div>

                  <div className="mt-4">
                      <h1 className="ml-4">Danger Zone</h1>
                      <button className="text-white font-semibold rounded-md m-4 p-2 bg-danger" onClick={deleteBoard} data-name="orgs">Delete Board</button>
                  </div>
              </div>

              <div className="mt-4">
                <h1 className="font-semibold">Toggle AI Creation</h1>
                <div className="mt-4">
                <ToggleAI />
                </div>
              </div>

          </div>
          <p>need to implement on this page:</p>
            <li>update board - hook created, i think something wrong with postman</li>
            <li>read members - hook is created, i think its a postman issue pretty sure i have the wrong url</li>
            <li>assign people to board</li>
            <li>update roles/permissions for board</li>
            <li>toggle ai for this board??</li>

            <br />

            <h2>Board Members</h2>
            { membersBoard && membersBoard.length > 0 
              ? (
                membersBoard.map((member, i) => {
                  return <MembersBoard member={member} key={i}/>
                })
              )
              : (
                  <p>This org does not have any members</p>
                )}
            <br />
            <h2>Org Members</h2>
            { membersOrgBoard && membersOrgBoard.length > 0
              ? (
                membersOrgBoard.map((member, i) => {
                  return <MembersBoardOrg member={member} key={i}/>
                })
              )
              : (
                <p>This section is loading</p>
              )}
      </div>        
    </div>
  );
};

export default SpecificBoard;
