import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../..";
import { useMatch } from "react-router";
import axios from "axios";

export const useRemoveMemberOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const removeMemberOrg = async ({userID}) => {
        let token = await getAccessTokenSilently();

        const options = {
            method: 'DELETE',
            url: `${serverAddress}/api/organizations/${orgId}/members/${userID}`,
            params: { 
                user_id: userID
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        await axios
            .request(options)
            .then(response => {
                console.log("Member was removed");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return { removeMemberOrg }
}