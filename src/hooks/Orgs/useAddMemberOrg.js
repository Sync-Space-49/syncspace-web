import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../.."
import axios from "axios"
import { useMatch } from "react-router"

export const useAddMemberOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const addMemberOrg = async ({user_id}) => {
        console.log("orgID: ", orgId, " userID: ", user_id)

        let token = await getAccessTokenSilently()
        var url = `${serverAddress}/api/organizations/${orgId}/members`

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

    return { addMemberOrg }
}