import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllVideos from "./AllVideos";

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

function MainPage() {
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

    // const storedJwt = localStorage.getItem('token');
    // const [jwt, setJwt] = useState(storedJwt || null);
    const [videos, setVideos] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const getVideos = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/netflix/videos/all`);
            setVideos(data);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    useEffect(() => {
        getVideos().then(null);
    }, [])

    // if (jwt !== null ) {
        return (
            <div>
                <AllVideos videos={videos} />
            </div>
        );
    // } else {
    //     return (
    //         <div>log in form
    //             {console.log(videos.length)}
    //             {console.log(fetchError)}
    //             <button onClick={() => getVideos()}>login</button></div>
    //     );
    // }
}

export default MainPage;