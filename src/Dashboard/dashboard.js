import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoSettingsSharp } from "react-icons/io5";
import SYNC from './images/SyncSpace-mint.png'
import { serverAddress } from "../index";
import axios from "axios";
import DashOrg from '../DashOrg/dashorg';


function Dashboard() {

  const { logout } = useAuth0();

  const [show, dashShow] = useState(true)
  const [org, orgShow] = useState(false)
  const [setting, settingShow] = useState(false)
  var data = [];

  const style = { color: "white" }

  const { getAccessTokenSilently, user } = useAuth0();
  const userID = user.sub;
  var url = `${serverAddress}/api/users/${userID}/organizations`

  const [orgs, setOrgs] = useState()  

  useEffect(()=> {
    getOrgs()
  }, []);

  const getOrgs = async () => {
    let token = await getAccessTokenSilently();
    const userId = user.sub;
    const options = {
      method: 'GET',
      url: `${serverAddress}/api/users/${userId}/organizations`,
      headers: { authorization: `Bearer ${token}` }
    }
  
    await axios(options)
      .then(res => {
        setOrgs(res.data)
        
        console.log(orgs)
        if (res.data){
          console.log("Retreived ",orgs.length," organizations")
        }
        else{
          console.log("No boards were found under this organization.")
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const createOrg = async () => {
    let token = await getAccessTokenSilently();
    var url = `${serverAddress}/api/organizations`

    const options = {
      method: 'POST',
      url: url,
      params: { 
        title: 'demo org 3',
        description: 'demo org 3'
      },
      headers: {
          'Authorization': `Bearer ${token}`
      },
    };  

    axios
      .request(options)
      .then(function (res) {
        console.log("Created new organization")
        getOrgs()
      })
      .catch(function (error) {
        console.error(error);
      });
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
              <button className="text-white hover:text-primary" onClick={()=>{
                dashShow(show);
                orgShow(org);
                settingShow(setting);
                }}>Dashboard</button>
            </div>

            <div className="w-full h-8 flex items-center p-6 border border-dark border-l-0 border-r-0 hover:border-slate-400 hover:font-semibold">
              <button className="text-white hover:text-primary" onClick={()=>{
                dashShow(!show);
                orgShow(!org);
                settingShow(setting);
                }}>Organizations</button>
            </div>

            <div className="w-full h-8 flex items-center p-6 border border-dark border-l-0 border-r-0 hover:border-slate-400 hover:font-semibold">
              <button className="text-white hover:text-primary" onClick={()=>{
                dashShow(!show);
                orgShow(org);
                settingShow(!setting);
                }}>Profile</button>
            </div>

            <div className="w-full h-8 flex items-center p-6 border border-dark border-l-0 border-r-0 hover:border-slate-400 hover:font-semibold">
              <button className="text-white hover:text-primary" onClick={()=>{
                dashShow(!show);
                orgShow(org);
                settingShow(!setting);
                }}>Recent</button>
            </div>
            
          </div>
          
          {/* Log out */}
          <div className="flex items-end w-full h-3/5 pb-4 pl-2">
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
            {
              show?<div className="p-6 flex flex-col space-y-12">

                <div className="space-y-2">
                  <h1 className="text-dark text-3xl">Welcome {user.name}!</h1>
                  <p className="text-dark">View and manage your organizations below.</p>
                </div>

                {/* <p>need to implement on this page:</p>
                <li>create org</li> */}

                <div className="flex flex-wrap">

                {orgs && orgs.length > 0 ? (
                  orgs.map((org, i) => {
                    return <DashOrg org={org} key={i} />;
                  })
                ) : (
                  <h1 className="ion-padding">No organizations were found.</h1>
                )}

                </div>

                <button className="text-dark font-semibold rounded-md p-2 w-60 bg-primary" onClick={createOrg} data-name="orgs">+ Create New Organization</button>


              {/* Org Showcase */}
                <div>
                </div>

              </div>:null
            }
          </div>

          {/* Organizations */}
          <div>
            {
              org?<p>testing</p>:null
            }
          </div>

          {/* Settings */}
          <div>
            {
              setting?<p>this is differentx</p>:null
            }
          </div>

        </div>
    </div>
  );
}

export default Dashboard;
