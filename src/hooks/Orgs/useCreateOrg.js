import { useAuth0 } from "@auth0/auth0-react";
import { serverAddress } from "../..";
import axios from "axios";

export const useCreateOrg = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createOrg = async ({title, description}) => {
        let token = await getAccessTokenSilently();
        var url = `${serverAddress}/api/organizations`

        const options = {
        method: 'POST',
        url: url,
        params: { 
            title: title,
            description: description
        },
        headers: {
            'Authorization': `Bearer ${token}`
        },
        };  

        await axios
        .request(options)
        .then(function (res) {
            console.log("Created new organization")
            // getOrgs()
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    return { createOrg }
}