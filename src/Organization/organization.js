import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { serverAddress } from "../index";
import { useAuth0 } from "@auth0/auth0-react";

const Organization = () => {
  // const { getAccessTokenSilently, user } = useAuth0();
  // const token = getAccessTokenSilently();
  // const userID = user.sub;
  // var url = `${serverAddress}/api/users/${userID}/organizations`
  
  // const getOrgs = () => {
  //   axios.get(url, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //   }
  //   })
  //     .then(res => {
  //       console.log(res)
  //     })
  // }
  
  return (
    <div>
        <p>Organization</p>
        {/* <button onClick={getOrgs} data-name="orgs">Get Orgs</button> */}
    </div>
  );
}

export default Organization;
