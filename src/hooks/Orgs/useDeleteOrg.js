import { useAuth0 } from "@auth0/auth0-react"
import { useMatch, useNavigate } from "react-router"
import { serverAddress } from "../.."
import axios from "axios"

export const useDeleteOrg = () => {
    const { getAccessTokenSilently } = useAuth0()
    const navigate = useNavigate()

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const deleteOrg = async () => {
        let token = await getAccessTokenSilently();

        const options = {
            method: 'DELETE',
            url: `${serverAddress}/api/organizations/${orgId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        await axios
            .request(options)
            .then(response => {
                console.log("Organization was deleted.");
                navigate("/")
            })
            .catch(error => {
                console.error(error);
            });
    }

    return { deleteOrg }
}