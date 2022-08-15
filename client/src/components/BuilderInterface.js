import React from 'react'

import styles from './BuilderInterface.module.css'

function BuilderInterface(props) {
    return (
        <div className={styles.background}>{props.code}</div>
    )
}

export default BuilderInterface;
