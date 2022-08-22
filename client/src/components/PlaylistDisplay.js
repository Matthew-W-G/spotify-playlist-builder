import React, { useEffect, useState } from 'react'
import spotifyWebAPI from 'spotify-web-api-node'

function PlaylistDisplay(props) {
    const [val, setVal] = useState([])

    useEffect(() => {
        getFullTracks(spotifyApi, "dance", 50).then(response => setVal(response))
    }, [])


    var spotifyApi = new spotifyWebAPI({
        clientId: 'bc038703857746eaab7721c0862ae10e',
    });
    spotifyApi.setAccessToken(props.accessToken)

    console.log(val)

    return (
        <div>
            {val[0]}
        </div>
    )
}


async function getFullTracks(spotifyApi, phrase, size) {
    const data = await spotifyApi.searchPlaylists('80s bops', {limit:20})
    const playlistIDList = []
    for(var i = 0; i < data.body.playlists.items.length; i++) {
        playlistIDList.push( data.body.playlists.items[i].id)
    }

    var trackHolder = [];
    for(var i = 0; i < playlistIDList.length; i++) {
        const trackData = await spotifyApi.getPlaylistTracks(playlistIDList[i], {
            offset: 1,
            limit: 15,
        })
        for(var x = 0; x < 15; x++) {
            trackHolder.push(trackData.body.items[x].track.id);
        }
    }


    const userTopArtists = await spotifyApi.getMyTopArtists({limit: 50});
    const userTopArtistsID = []
    for(var i = 0; i < userTopArtists.body.items.length; i++) {
        userTopArtistsID.push(userTopArtists.body.items[i].id)
    }

    const userTopTracks = await spotifyApi.getMyTopTracks({limit: 50});
    const userTopTracksID = []
    for(var i = 0; i < userTopTracks.body.items.length; i++) {
        userTopTracksID.push(userTopTracks.body.items[i].id)
    }
    console.log(userTopTracksID)


    const matchingTracks = trackHolder.filter(element => userTopTracksID.includes(element));

    


    return trackHolder;
}

export default PlaylistDisplay;