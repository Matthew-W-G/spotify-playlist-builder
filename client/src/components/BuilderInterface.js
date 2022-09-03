import React, { useState } from 'react'

import Customize from './Customize';
import PlaylistDisplay from './PlaylistDisplay';

function BuilderInterface(props) {
    const [valuesCaputured, setValuesCaptured] = useState(false);
    const [phrase, setPhrase] = useState("");
    const [size, setSize] = useState();


    function setInputs(newPhrase, newSize) {
        setPhrase(newPhrase)
        setSize(newSize)
        setValuesCaptured(true)
    }

    console.log(phrase);

    return (
        valuesCaputured ?
            <PlaylistDisplay phrase={phrase} size={size} accessToken={props.accessToken}></PlaylistDisplay>
            : <Customize setValues={setInputs}></Customize>
    )
}

export default BuilderInterface;
