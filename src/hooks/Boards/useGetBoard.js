import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from "../.."
import axios from "axios"
import { useMatch } from "react-router"

export const useGetBoard = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId/:boardId")
    const orgId = match.params.orgId
    const boardId = match.params.boardId

    const [board, setBoard] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const getBoard = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently();

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/boards/${boardId}`,
            headers: {
                authorization: `Bearer ${token}`
            },
        }; 

        await axios(options)
            .then(res => {
                if (res.data){
                    setBoard(res.data) 
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    console.log(res.data)
                    console.log("Retreived ",board.length," boards for this organization")
                }
                else{
                    console.log("this org does not have any boards")
                }
            })
            .catch((error) => {
                console.log(error.message);
            }); 
        
        return () => unsubscribe()
    }

    useEffect(() => {
        getBoard()
    }, [])

    return { board, title, description } 
}