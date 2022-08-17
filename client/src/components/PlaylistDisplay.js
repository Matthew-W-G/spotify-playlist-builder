import React from 'react'
import spotifyWebAPI from 'spotify-web-api-node'

function PlaylistDisplay(props) {
    var spotifyApi = new spotifyWebAPI({
        clientId: 'bc038703857746eaab7721c0862ae10e',
    });
    var val = ""

    console.log(props.accessToken)
    spotifyApi.setAccessToken(props.accessToken)

    spotifyApi.searchArtists('Love')
        .then(function (data) {
            console.log('Search artists by "Love"', data.body);
        }, function (err) {
            console.error(err);
        });

    return (
        <div>{val}
        </div>
    )
}

export default PlaylistDisplay;