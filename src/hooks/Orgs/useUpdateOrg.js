import { useAuth0 } from "@auth0/auth0-react"
import { useMatch } from "react-router-dom"
import { serverAddress } from "../.."
import axios from "axios"

export const useUpdateOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/update")
    const orgId = match.params.orgId

    const updateOrg = async ({title, newTitle, description, newDescription}) => {
        if (newTitle === "none"){
            newTitle = title
        }
        else if( newDescription === "none"){
            newDescription = description
        }
        
        let token = await getAccessTokenSilently()
    
        const options = {
          method: 'PUT',
          url: `${serverAddress}/api/organizations/${orgId}`,          
          params: {
            description: newDescription,
            title: newTitle
          },
          headers: {
              'Authorization': `Bearer ${token}`
          }
        };  
    
        await axios
          .request(options)
          .then(function (res) {
            console.log("org was updated")
          })
          .catch(function (error) {
              console.error(error);
          });        
    }
    
    return { updateOrg }
}