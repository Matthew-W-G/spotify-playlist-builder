import React from 'react'
import styles from './PhraseSelect.module.css'

function PhraseSelect(props) {
    return (
        <div className={styles.container}>
            <input
                placeholder="Enter your custom phrase here"
                className={styles.input}
            ></input>
        </div>
    )
}

export default PhraseSelect;
