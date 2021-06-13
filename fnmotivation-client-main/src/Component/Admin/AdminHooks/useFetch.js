import { useEffect, useState } from "react"

const Usefetch = (url) => {

    const token = localStorage.getItem('admiNToken')
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
                setData(data)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [url])

    return { data, isLoading, error }

}

export default Usefetch;