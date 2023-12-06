import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../..";
import { useMatch } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetOrgBoard = () => {
    const { getAccessTokenSilently } = useAuth0() 

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const [org, setOrg] = useState([]) 
    const [name, setName] = useState("")
    const [description, setDescription] = useState('')

    const getOrgBoard = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently();

        const options = {
          method: 'GET',
          url: `${serverAddress}/api//organizations/${orgId}`,
          headers: { authorization: `Bearer ${token}` }
        }
        
        await axios(options)
          .then(res => {
            setOrg(res.data)
            setName(res.data.name)
            setDescription(res.data.description)            
            if (res.data){
              console.log("Retreived organization")
            }
            else{
              console.log("this org does not exist?")
            }
          })
          .catch((error) => {
            console.log(error);
          });
          return () => unsubscribe()
      }

    useEffect(() => {
        getOrgBoard()
    }, [])
    
    return { org, name, description }
}