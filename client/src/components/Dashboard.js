import React, { useEffect, useState } from 'react'
import Login from './Login'
import BuilderInterface from './BuilderInterface'
import axios from 'axios'
import spotifyWebAPI from 'spotify-web-api-node'
import styles from './Dashboard.module.css'


const code = new URLSearchParams(window.location.search).get('code')

function Dashboard(props) {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            window.history.pushState({}, null, '/')
        }).catch(() => { window.location = '/' })
    }, [code])

    /*
    useEffect(() => {
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])
    */


    return (
        code ?
            <div className={styles.background}>
                <BuilderInterface accessToken={accessToken}></BuilderInterface>
            </div>
            : <Login></Login>
    )
}

export default Dashboard;