// import React, { useEffect, useState, useCallback, createContext, useContext, } from 'react';

// export const NotiContext = createContext()

// export const NotiInfoProvider = props => {

//     const token = localStorage.getItem('token')
//     const [preloaderVisibale, setPreloaderVisible] = useState(true)
//     const [visiable, setVisiable] = useState(12)

//     const [notifications, setNotifications] = useState([])
//     const userID = JSON.parse(localStorage.getItem('userID'))

//     const IDS = `${userID},${visiable}`

    

//     const NotiInfo = {notifications, preloaderVisibale, setPreloaderVisible, getNotifications, visiable, setVisiable}

//     return (
//         <NotiContext.Provider value={NotiInfo}>
//             {props.children}
//         </NotiContext.Provider>
//     )

// }