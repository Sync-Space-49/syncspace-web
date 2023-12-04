import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { serverAddress } from ".."
import axios from "axios"

export const useGetUsers = () => {
    const {getAccessTokenSilently} = useAuth0()
    const [users, setUsers] = useState("none")

    const getUsers = async () => {
        let unsubscribe
        let token = await getAccessTokenSilently()

        const options = {
            method: 'GET',
            url: `${serverAddress}/api/users`,
            headers: { authorization: `Bearer ${token}`}
        }

        await axios(options)
            .then(res => {
                if(res.data) {
                    console.log("retreived users")
                    setUsers(res.data)
                    console.log(res.data)
                }
                else {
                    console.log("there are no users ?")
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

        return () => unsubscribe()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return { users }
}