import React, { useEffect, useState, useCallback, createContext } from 'react';
import { useParams } from 'react-router-dom';
import Usefetch from '../AdminHooks/UseFetch';

export const AdminContext = createContext()

export const AdminContextProvider = props => {
   
    const [uID, setUID] = useState(null)

    const token = localStorage.getItem('admiNToken')
    const [user, setUser] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`http://68.183.178.196/userInfo/${uID}`, {
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
                setUser(data)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [])

    const AdminData = {uID, setUID, user, isLoading, error}
    return (
        <AdminContext.Provider value={{...AdminData}}>
            {props.children}
        </AdminContext.Provider>
    )
}