import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { serverAddress } from "../index";
import { useAuth0 } from "@auth0/auth0-react";

const Organization = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const userID = user.sub;
  var url = `${serverAddress}/api/users/${userID}/organizations`
  
  const getOrgs = async () => {
    let token = await getAccessTokenSilently();
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
    }
    })
      .then(res => {
        console.log(res)
      })
  }
  
  return (
    <div>
        <p>Organization</p>
        <button className="text-dark font-semibold rounded-md m-4 p-2 bg-primary" onClick={getOrgs} data-name="orgs">Get Orgs</button>
    </div>
  );
}

export default Organization;
