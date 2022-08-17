import React, { useState } from 'react'

import Customize from './Customize';
import PlaylistDisplay from './PlaylistDisplay';

function BuilderInterface(props) {
    const [valuesCaputured, setValuesCaptured] = useState(false);
    let phrase = ""
    let size = 0

    function setInputs(newPhrase, newSize) {
        phrase = newPhrase
        size = newSize
        setValuesCaptured(true)
    }

    return (
        valuesCaputured ?
            <PlaylistDisplay phrase={phrase} size={size} accessToken={props.accessToken}></PlaylistDisplay>
            : <Customize setValues={setInputs}></Customize>
    )
}

export default BuilderInterface;
