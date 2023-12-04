import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from "../.."
import { useMatch } from "react-router-dom"
import axios from "axios"

export const useGetMembersOrg = () => {
    const { getAccessTokenSilently } = useAuth0()

    const [membersOrg, setMembersOrg] = useState([])

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const getMembersOrg = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently()

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/members`,
            headers: { authorization: `Bearer ${token}`}
        }

        await axios(options)
            .then(res => {
                if (res.data) {
                    console.log("retreived org members")
                    setMembersOrg(res.data)
                    console.log(res.data)
                }
                else {
                    console.log("this org does not have members?")
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
        
        return () => unsubscribe()
    }

    useEffect(() => {
        getMembersOrg()
    }, [])
    
    return { membersOrg }
}