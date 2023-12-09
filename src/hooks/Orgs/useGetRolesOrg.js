import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from "../.."
import { useMatch } from "react-router-dom"
import axios from "axios"

export const useGetRolesOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const [rolesOrg, setRolesOrg] = useState([])

    const match = useMatch("/organization/:orgId/roles")
    const orgId = match.params.orgId

    const getRolesOrg = async () => {
        let token = await getAccessTokenSilently()

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/roles`,
            headers: { authorization: `Bearer ${token}`}
        }

        await axios(options)
            .then(res => {
                if (res.data) {
                    console.log("retreived org roles")
                    console.log(res.data)
                    setRolesOrg(res.data)
                }
                else {
                    console.log("this org does not have any roles")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getRolesOrg()
    }, [])
    
    return { rolesOrg }
}