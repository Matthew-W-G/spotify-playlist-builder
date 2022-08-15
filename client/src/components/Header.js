import React from 'react'
import styles from './Header.module.css'

function Header(props) {
    return (
        <div className={styles.background}>
            <h3 className={styles.headerText}>Spotify Playlist Builder</h3>
        </div>
    )
}

export default Header;