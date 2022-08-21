import React, { useState } from 'react'
import spotifyWebAPI from 'spotify-web-api-node'

function PlaylistDisplay(props) {
    var spotifyApi = new spotifyWebAPI({
        clientId: 'bc038703857746eaab7721c0862ae10e',
    });
    spotifyApi.setAccessToken(props.accessToken)

    getTopPlaylists(spotifyApi, 'Dance');

    return (
        <div>
        </div>
    )
}

function getTopPlaylists(spotifyApi, phrase) {
    spotifyApi.searchPlaylists('Dance')
        .then(response => {
            const data = response.body.playlists.items;
            getTracks(spotifyApi, data.map(x => String(x.id)));
        });
}

function getTracks(spotifyApi, ids) {
    for (var i = 0; i < ids.length; i++) {
        spotifyApi.getPlaylistTracks(ids[i], {
            offset: 1,
            limit: 15,
        }).then(response => {
            for(var x = 0; x < response.body.items.length; x++) {
                filterTracks(spotifyApi, response.body.items[x].track.id);
            }
        });
    }
}

function filterTracks(spotifyApi, id) {
    console.log(id);
}


export default PlaylistDisplay;