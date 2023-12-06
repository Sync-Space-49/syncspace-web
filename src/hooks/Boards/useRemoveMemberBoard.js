import { useAuth0 } from "@auth0/auth0-react"
import { serverAddress } from "../..";
import { useMatch } from "react-router";
import axios from "axios";

export const useRemoveMemberBoard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const removeMemberBoard = async ({userID}) => {
        let token = await getAccessTokenSilently();

        const options = {
            method: 'DELETE',
            url: `${serverAddress}/api/organizations/${orgId}/boards/${boardId}/members/${userID}`,
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

    return { removeMemberBoard }
}