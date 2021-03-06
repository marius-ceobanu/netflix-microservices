import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllVideos from "./AllVideos";
import Login from "./Login";
import {Button} from "react-bootstrap";

const apiUrl = "http://localhost:8762";

// TODO use if implementing Security config with JWT in Spring Security
// axios.interceptors.request.use(
//     config => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = [apiUrl];
//         const token = localStorage.getItem('token');
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

function MainPage({ jwt, setToken, user, setUser }) {
    // let config = {
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         "Content-Type":"application/json"
    //     },
    //     proxy: {
    //         host: '192.168.0.51',
    //         port: 8762
    //     },
    //     mode:"cors",
    // };

    const [videos, setVideos] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const getVideos = async () => {
        try {
            const { data } = await axios.get(
                `${apiUrl}/netflix/videos/all`,
                {headers: { Authorization: `Bearer ${jwt}` }}
                );
            setVideos(data);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    useEffect(() => {
        if(jwt !== null) {
            getVideos().then(null);
        }
    }, [jwt])

    if (jwt !== null ) {
        return (
            <div>
                {console.log(fetchError)}
                <Button className={"m-2"} onClick={() => {localStorage.clear(); window.location.reload()}}>{user}</Button>
                <AllVideos videos={videos} />
            </div>
        );
    } else {
        return (
            <div>
                {console.log(fetchError)}
                <Login setToken={setToken}
                        setFetchError={(error) => setFetchError(error)}
                        setUser={setUser}>login</Login>
            </div>
        );
    }
}

export default MainPage;