import { useAuth0 } from "@auth0/auth0-react"
import { useMatch } from "react-router-dom"
import { serverAddress } from "../.."
import axios from "axios"

export const useCreateRole = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/roles")
    const orgId = match.params.orgId

    const createRole = async ({name, description}) => {
        
        let token = await getAccessTokenSilently()
    
        const options = {
          method: 'POST',
          url: `${serverAddress}/api/organizations/${orgId}/roles`,          
          params: {
            name: name,
            description: description
          },
          headers: {
              'Authorization': `Bearer ${token}`
          }
        };  
    
        await axios
          .request(options)
          .then(function (res) {
            console.log(res.data.name)
            console.log("role was created")
          })
          .catch(function (error) {
              console.error(error);
          });        
    }
    
    return { createRole }
}