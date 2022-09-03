import React, { useEffect, useState } from 'react'
import spotifyWebAPI from 'spotify-web-api-node'
import styles from './PlaylistDisplay.module.css'

function PlaylistDisplay(props) {
    const [playlistID, setPlaylistID] = useState()

    var spotifyApi = new spotifyWebAPI({
        clientId: 'bc038703857746eaab7721c0862ae10e',
    });
    spotifyApi.setAccessToken(props.accessToken)

    useEffect(() => {
        getFullTracks(spotifyApi, props.phrase, props.size)
            .then(response => addPlaylist(spotifyApi, props.phrase, response)).then(id => setPlaylistID(id))
    }, [])


    /*
        
    */

    return (
        <React.Fragment>
            {playlistID &&
                <iframe 
                    className={`${styles.playlist}` }
                    styles="border-radius:12px"
                    src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
                    width="40%"
                    height="500"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
            }
        </React.Fragment>
    )
}


async function getFullTracks(spotifyApi, phrase, size) {
    const data = await spotifyApi.searchPlaylists(phrase, { limit: 20 })

    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 50 });
    const userTopArtistsID = []
    for (var i = 0; i < userTopArtists.body.items.length; i++) {
        userTopArtistsID.push(userTopArtists.body.items[i].uri)
    }


    const playlistIDList = []
    for (var i = 0; i < data.body.playlists.items.length; i++) {
        playlistIDList.push(data.body.playlists.items[i].id)
    }

    var returnedTracks = [];
    var matchingTracksByArtist = [];
    for (var i = 0; i < playlistIDList.length; i++) {
        const trackData = await spotifyApi.getPlaylistTracks(playlistIDList[i], {
            offset: 1,
            limit: 15,
        })
        var count = (trackData.body.items.length > 15) && 15 ||trackData.body.items.length
        for (var x = 0; x < count; x++) {
            console.log(trackData.body)
            returnedTracks.push(trackData.body.items[x].track.uri);
            if (userTopArtistsID.includes(trackData.body.items[x].track.artists[0].uri)) {
                matchingTracksByArtist.push(trackData.body.items[x].track.uri);
            }
        }
    }

    const userTopTracks = await spotifyApi.getMyTopTracks({ limit: 50 });
    const userTopTracksID = []
    for (var i = 0; i < userTopTracks.body.items.length; i++) {
        userTopTracksID.push(userTopTracks.body.items[i].uri)
    }


    const matchingTracks = returnedTracks.filter(element => userTopTracksID.includes(element));


    var customSelectedTracks = matchingTracks.concat(matchingTracksByArtist);

    console.log(size)

    if (customSelectedTracks.length > size) {
        customSelectedTracks = customSelectedTracks.slice(0, size)
    }
    else {
        const addGoal = size - customSelectedTracks.length;
        customSelectedTracks = customSelectedTracks.concat(returnedTracks.slice(0, addGoal))
    }
    return customSelectedTracks;
}



async function addPlaylist(spotifyApi, phrase, tracks) {
    console.log("hereeee!")
    const newPlaylistID = await spotifyApi.createPlaylist(`My ${phrase} playlist`, { 'description': `${phrase} playlist`, 'public': true })
        .then(function (data) {
            const newPlaylistID = data.body.id;
            spotifyApi.addTracksToPlaylist(newPlaylistID, tracks)
            return newPlaylistID
        }, function (err) {
            console.log('Something went wrong!', err);
        });
    return newPlaylistID
}



export default PlaylistDisplay;