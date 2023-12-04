import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../..";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetOrgs = () => {
    const { getAccessTokenSilently, user } = useAuth0()

    const [orgs, setOrgs] = useState() 

    const getOrgs = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently();

        const userId = user.sub;
        const options = {
          method: 'GET',
          url: `${serverAddress}/api/users/${userId}/organizations`,
          headers: { authorization: `Bearer ${token}` }
        }
      
        await axios(options)
          .then(res => {
            if (res.data){
              setOrgs(res.data)
            }
            else{
              console.log("this org does not have any boards")
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
          return () => unsubscribe()
      }

    useEffect(() => {
        getOrgs()
    }, [])
    
    return { orgs }
}