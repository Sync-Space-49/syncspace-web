import { useAuth0 } from "@auth0/auth0-react"
import { useMatch } from "react-router-dom"
import { serverAddress } from "../.."
import axios from "axios"

export const useUpdateOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/update")
    const orgId = match.params.orgId

    const updateOrg = async ({name, newName, description, newDescription}) => {
        if (newName === "none"){
            newName = name
        }
        else if( newDescription === "none"){
            newDescription = description
        }
        let token = await getAccessTokenSilently()

        var url = `${serverAddress}/api/organizations/${orgId}`
    
        const options = {
          method: 'PUT',
          url: url,          
          params: {
            description: newDescription,
            name: newName
          },
          headers: {
              'Authorization': `Bearer ${token}`
          }
        };  
    
        await axios
          .request(options)
          .then(function (res) {
            console.log(res)
          })
          .catch(function (error) {
              console.error(error);
          });        
    }
    return { updateOrg }
}