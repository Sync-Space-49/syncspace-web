import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useMatch } from "react-router-dom"
import { serverAddress } from "../.."
import axios from "axios"

export const useGetMembersBoard = () => {
    const {getAccessTokenSilently} = useAuth0()
    const [membersBoard, setMembersBoard] = useState([])

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const getMembersBoard = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently()

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/boards/${boardId}/members`,
            headers: { authorization: `Bearer ${token}`}
        }

        await axios(options) 
            .then(res => {
                if(res.data) {
                    console.log("retreived board members")
                    setMembersBoard(res.data)
                }
                else {
                    console.log("this board does not have members")
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

        return () => unsubscribe()
    }

    useEffect(() => {
        getMembersBoard()
    }, [])

    return { membersBoard }
}