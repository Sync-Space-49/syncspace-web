import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SYNC from './images/SyncSpace-mint.png'
import {
  Link, useMatch, useNavigate
} from "react-router-dom";
import DashOrg from '../Components/Orgs/dashorg';
import { useCreateOrg } from "../hooks/Orgs/useCreateOrg";
import { useGetOrgs } from "../hooks/Orgs/useGetOrgs";


function Dashboard() {

  const { createOrg } = useCreateOrg()
  const { orgs } = useGetOrgs()

  const [titleCreateOrg, setTitleCreateOrg] = useState("none")
  const [descCreateOrg, setDescCreateOrg] = useState("none")

  const { logout } = useAuth0();

  const [show, dashShow] = useState(true)
  const [org, orgShow] = useState(false)
  const [setting, settingShow] = useState(false)

  const { user } = useAuth0();

  const onSubmitCreate = async (e) => {
    e.preventDefault()
    createOrg({
      title: titleCreateOrg,
      description: descCreateOrg
    })
    document.getElementById('title-create-org').value = ''
    document.getElementById('desc-create-org').value = ''
  }

  return (

    // Container
    <div className="flex">
      {/* Left side navigation */}
        <div className="w-1/5 h-screen bg-dark">

          <div className="flex items-center space-x-2 p-4 border border-slate-400 border-t-0 border-l-0 border-r-0">
            
            <img style={{width: "50px", height: "50px"}} src={SYNC}/>
            <div className="flex space-x-2">
              <h1 className="text-white text-xl">SyncSpace</h1>
              <h1 className="text-white font-semibold text-xl">Admin</h1>
            </div>
          
          </div>

          {/* Sidebar buttons */}
          <div className="flex flex-col mt-2 space-y-2">


            <div className="pl-6 pt-3 pb-4 border border-slate-400 border-l-0 border-r-0 border-t-0">
              <button className="text-white">Navigation</button>
            </div>

            <div className="flex flex-col justify-between">

            <div className="mb-96">

            <div className="w-full h-8 flex items-center p-6 border border-dark border-l-0 border-r-0 hover:border-slate-400 hover:font-semibold">
              <button className="text-white hover:text-primary">
              <Link className="p-1" to={`/dashboard`}>Dashboard</Link>
                </button>
            </div>

            <div className="w-full h-8 flex items-center p-6 border border-dark border-l-0 border-r-0 hover:border-slate-400 hover:font-semibold">
              <button className="text-white hover:text-primary">
              <Link className="p-1" to={`/profile`}>Profile</Link>
              </button>
            </div>
            
          </div>
          
          {/* Log out */}
          <div className="flex items-end w-full mt-20 pb-4 pl-2">
            <button className="text-dark font-semibold rounded-md mt-4 ml-4 p-2 bg-primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          </div>

          </div>

          </div>

        </div>

        {/* Admin Panel Content */}
        <div className="w-4/5 h-screen bg-landing">

          <div className="w-full h-20 bg-test flex justify-end">
            <div className="flex bg-dark justify-end items-center space-x-4 p-6">
              <p className="text-white">{user.name}</p>
              <img className="rounded" style={{width: "50px", height: "50px"}} src={user.picture} alt={user.name}/>
            </div>
          </div>

          {/* Dashboard */}
          <div>
            
              <div className="p-6 flex flex-col space-y-12">

                <div className="space-y-2">
                  <h1 className="text-dark text-3xl">Welcome {user.name}!</h1>
                  <p className="text-dark">View and manage your organizations below.</p>
                </div>

                <div className="flex flex-wrap">

                {orgs && orgs.length > 0 ? (
                  orgs.map((org, i) => {
                    return <DashOrg org={org} key={i} />;
                  })
                ) : (
                  <h1 className="ion-padding">No organizations were found.</h1>
                )}

                </div>

                {/* <button className="text-dark font-semibold rounded-md p-2 w-60 bg-primary" onClick={createOrg} data-name="orgs">+ Create New Organization</button> */}

              <div className="flex flex-col">
              <h1 className="text-xl font-semibold mt-4 mb-4">Create New Organization</h1>
                <form onSubmit={ onSubmitCreate }
                className="flex flex-col space-y-4 w-fit">
                  <input 
                    className="border border-dark rounded p-1"
                    type="text" 
                    placeholder="Name" 
                    required 
                    id="title-create-org"
                    onChange={(e) => setTitleCreateOrg(e.target.value)} 
                    />
                  <input 
                    className="border border-dark rounded p-1"
                    type="text" 
                    placeholder="Description" 
                    required 
                    id="desc-create-org"
                    onChange={(e) => setDescCreateOrg(e.target.value)}
                    />
                  <button type="submit" className="text-dark font-semibold rounded-md p-1 bg-primary">Submit</button>
                </form>
              </div>

              </div>
            
          </div>

        </div>
    </div>
  );
}

export default Dashboard;
