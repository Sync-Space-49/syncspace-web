import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../.."
import { useMatch } from "react-router-dom"
import axios from "axios"

export const useCreateBoard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const createBoard = async ({title, description}) => {
        let token = await getAccessTokenSilently()

        var url = `${serverAddress}/api/organizations/${orgId}/boards`
    
        const options = {
          method: 'POST',
          url: url,
          params: { 
            title: title,
            description: description
          },
          headers: {
              'Authorization': `Bearer ${token}`
          },
        };  
    
        axios
          .request(options)
          .then(function (res) {
            console.log(res)
            console.log("Created new board")
            // getOrgOld()
          })
          .catch(function (error) {
              console.error(error);
          });
    }
    return { createBoard }
}