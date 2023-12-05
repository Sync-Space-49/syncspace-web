import { useAuth0 } from "@auth0/auth0-react"
import { useMatch, useNavigate } from "react-router"
import { serverAddress } from "../.."
import axios from "axios"

export const useDeleteBoard = () => {
    const { getAccessTokenSilently } = useAuth0()
    const navigate = useNavigate()

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId  

    const deleteBoard = async () => {
        let token = await getAccessTokenSilently()  

        const options = {
            method: 'DELETE',
            url: `${serverAddress}/api/organizations/${orgId}/boards/${boardId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        await axios(options)
            .then(res => {
                console.log('Board was deleted')
                navigate(`/organization/${orgId}`)
            })
    }

    return { deleteBoard }
}