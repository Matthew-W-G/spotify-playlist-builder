import React from 'react'
import styles from './SizeSelect.module.css'

function SizeSelect(props) {
    return (
        <div className={styles.container}>
            <select className={styles.select}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}

export default SizeSelect;