import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from "../.."
import { useMatch } from "react-router-dom"
import axios from "axios"

export const useGetMembersOrgBoard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const [membersOrgBoard, setMembersOrgBoard] = useState([])

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId

    const getMembersOrgBoard = async () => {
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
                    setMembersOrgBoard(res.data)
                }
                else {
                    console.log("this org does not have members?")
                }
            })
            .catch((error) => {
                console.log(error)
            })
        
        return () => unsubscribe()
    }

    useEffect(() => {
        getMembersOrgBoard()
    }, [])
    
    return { membersOrgBoard }
}