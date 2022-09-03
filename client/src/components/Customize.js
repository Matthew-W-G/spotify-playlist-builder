import React, { useState } from 'react'
import PhraseSelect from './PhraseSelect';
import SizeSelect from './SizeSelect';

import styles from './Customize.module.css'

function Customize(props) {
    const [phrase, setPhrase] = useState();
    const [size, setSize] = useState(10);

    function submitHandler(event) {
        event.preventDefault();
        props.setValues(phrase, size);
    }

    function phraseHandler(event) {
        setPhrase(event.target.value);
    }

    function sizeHandler(event) {
        setSize(event.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={styles.container}>
                <input
                    placeholder="Enter your custom phrase here"
                    className={`${styles.input} ${styles.phrase}`}
                    onChange={phraseHandler}
                ></input>
            </div>
            <div className={styles.container}>
                <select className={`${styles.input} ${styles.size}`} onChange={sizeHandler}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className={styles.container}>
                <button input="submit"className={`${styles.input} ${styles.submit}`}>Create Playlist</button>
            </div>
        </form>
    )
}

export default Customize;