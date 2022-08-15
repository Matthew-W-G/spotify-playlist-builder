import React, { useEffect } from 'react'
import Login from './Login'
import BuilderInterface from './BuilderInterface'
import axios from 'axios'

const code = new URLSearchParams(window.location.search).get('code')

function Dashboard(props) {
    console.log("Code", code)

    useEffect(() => {
        console.log("here");
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response.data)
        })
    }, [code])


    return (
        code ?
            <BuilderInterface code={code}></BuilderInterface>
            : <Login></Login>
    )
}

export default Dashboard;