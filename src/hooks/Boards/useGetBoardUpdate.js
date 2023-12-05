import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useMatch } from "react-router"
import { serverAddress } from "../.."
import axios from "axios"

export const useGetBoardUpdate = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/:boardId/update")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const [board, setBoard] = useState([])
    const [title, setTitle] = useState("none")
    const [description, setDescription] = useState("none")

    const getBoardUpdate = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently()

        const options = {
            method: 'GET',
            url: `${serverAddress}/api//organizations/${orgId}/boards/${boardId}`,
            headers: { authorization: `Bearer ${token}` }
          }
          
          await axios(options)
            .then(res => {
                console.log(res.data)
                setBoard(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                console.log(res.data.title, " ", res.data.description)
                console.log(board)
                
                if (res.data){
                console.log("Retreived organization")
                }
                else{
                console.log("this org does not exist?")
                }
            })
            .catch((error) => {
              console.log(error.message);
            });
        
        return () => unsubscribe()
    }

    useEffect(() => {
        getBoardUpdate()
    }, [])

    return { title, description }
}