import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../.."
import { useMatch } from "react-router-dom"
import axios from "axios"

export const useDeleteRole = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/roles")
    const orgId = match.params.orgId
    const roleId = match.params.roleId

    const deleteRole = async () => {
        let token = await getAccessTokenSilently()

        const options = {
            method: 'DELETE',
            url: `${serverAddress}/api/organizations/${orgId}/roles/${roleId}`,
            headers: { authorization: `Bearer ${token}`}
        }

        await axios(options)
            .then(res => {
                console.log("role was deleted")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    return { deleteRole }
}