import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from "../.."
import axios from "axios"
import { useMatch } from "react-router"

export const useGetBoards = () => {
    const { getAccessTokenSilently } = useAuth0()

    const match = useMatch("/organization/:orgId")
    const orgId = match.params.orgId

    const [boards, setBoards] = useState([])

    const getBoards = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently();

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/organizations/${orgId}/boards`,
            headers: {
                authorization: `Bearer ${token}`
            },
        }; 

        await axios(options)
            .then(res => {
                if (res.data){
                    setBoards(res.data) 
                    console.log("Retreived boards for this organization")
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
        getBoards()
    }, [])

    return { boards } 
}