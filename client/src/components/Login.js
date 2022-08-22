import React from 'react'
import styles from './Login.module.css'

const URL = "https://accounts.spotify.com/authorize?" +
    "client_id=bc038703857746eaab7721c0862ae10e&" +
    "response_type=code&" +
    "redirect_uri=http://localhost:3000/&" +
    "scope=playlist-modify-private%20user-library-read%20user-top-read"

function Login(props) {
    return (
        <div className={styles.background}>
            <a href={URL}>
                <button className={styles.button}>Connect to Spotify</button>
            </a>
        </div>
    )
}

export default Login;