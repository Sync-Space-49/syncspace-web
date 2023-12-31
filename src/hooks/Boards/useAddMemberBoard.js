import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../.."
import axios from "axios"
import { useMatch } from "react-router"

export const useAddMemberBoard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const addMemberBoard = async ({user_id}) => {
        let token = await getAccessTokenSilently()
        var url = `${serverAddress}/api/organizations/${orgId}/boards/${boardId}/members`

        const options = {
            method: 'POST',
            url: url,
            params: { 
                user_id: user_id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };  

        await axios
        .request(options)
        .then(function (res) {
            console.log("Member added to organization")
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    return { addMemberBoard }
}