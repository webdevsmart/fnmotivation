import { useEffect, useState } from "react"

const usefetchUserInfo = (url) => {

    const token = localStorage.getItem('admiNToken')
    const [info, setInfo] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: token
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Colud not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setInfo([...info, ...data])
                setIsPending(false)
            })
            .catch(err => {
                setIsPending(false)
                setError(err.message)
            })
    }, [url])

    return { info, isPending, error }

}

export default usefetchUserInfo;