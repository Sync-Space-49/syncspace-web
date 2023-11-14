import React from "react";

import {
    Link
  } from "react-router-dom";

function SignUp() {
  return (

    // container -> container
    // mx-auto -> 
    // px-30 ->
    // bg-gray-200 -> background color
    // rounded-xl -> rounds the corners of the container
    // shadow ->
    // border -> 
    // p-8 -> adds padding to the elements
    // m-10 -> adds margins to the element
    // align-middle -> aligns the 
    // flex ->
    // flex-col ->
    // space-y-4 -> adds horizontal spacing at a degree of 4
    // w-96 -> 

    <div className="container mx-auto px-30 bg-gray-200 rounded-xl shadow border p-8 m-10 align-middle flex flex-col w-96">
        <div className="text-center space-y-4">
            <img src="https://s3.us-east-1.wasabisys.com/sync-space/logo/SyncSpace-logo-100w.svg" alt="mint" />
            <h1>SyncSpace</h1>
            <h2>SignUp</h2>
        </div>
        <form className="flex flex-col space-y-2">
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className="rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="rounded" />
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="repeat-password">Repeat Password</label>
                <input type="password" name="repeat-password" id="repeat-password" className="rounded" />
            </div>
            
            <button type="submit" className="bg-slate-700 w-24 rounded">Sign Up</button>
        </form>
        <div className="text-center space-y-4">
            <h2>or</h2>
            <h3 className="underline"><Link to="/login">Log In</Link></h3>   
        </div> 
    </div>
  );
}

export default SignUp;
