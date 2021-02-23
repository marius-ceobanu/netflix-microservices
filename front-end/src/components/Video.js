import React, {useEffect, useState} from 'react';
import axios from "axios";
// import YouTube from '@u-wave/react-youtube';
import ReactStars from "react-rating-stars-component";
import { ListGroup, Button } from "react-bootstrap";

const apiUrl = "http://localhost:8762";

function Video(props) {
    const id = props.match.params.id;

    const [video, setVideo] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [comment, setComment] = useState(null);
    const [rating, setRating] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const getVideos = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/netflix/videos/${id}`);
            setVideo(data);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    const getRecommendations = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/netflix/videos/${id}/recommendations`);
            setRecommendations(data);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    };

    const addRecommendation = () => {
        axios.post(`${apiUrl}/netflix/videos/${id}/addrecommendation`, {
            rating: `${rating}`,
            comment: comment,
            videoId: `${id}`
        })
            .then((response) => {
                console.log(response);
                getRecommendations().then(null);
            }, (error) => {
                console.log(error);
            });
    };

    const rate = (newRating) => {
        setRating(newRating);
    }

    const changeComment = (e) => {
        setComment(e.target.value);
        e.target.value = "";
    }

    useEffect(() => {
        getVideos().then(getRecommendations);
    }, [])


    return (
        <div>
            <h3 style={{ color: '#00FFFF' }} className={'mt-5 mb-3'}>{video.name}</h3>
            {/*<YouTube video={video.url} width={'1080px'} height={'750px'} allowFullscreen={true} />*/}
            <iframe width="1080" height="750" src={`https://www.youtube.com/embed/${video.url}`} frameBorder="2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
            <ListGroup className={'m-5'}>
                {recommendations.map((rec, i) => (
                    <ListGroup.Item key={i} variant="info" className={"d-inline mb-2"}>
                        <ListGroup horizontal className={'justify-content-center'}>
                            <ListGroup.Item variant={"info"}>"{rec.comment}"</ListGroup.Item>
                            <ListGroup.Item variant={"info"} className={''}>
                                <ReactStars
                                value={rec.rating}
                                edit={false}
                                activeColor="#ffd700"
                                />
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="row justify-content-md-center p-5">
                <div className="col-md-auto">
                    <input type="text" className="comment" id="comment" aria-describedby="comment"
                           placeholder="comment" style={{ minWidth: "400px" }} onBlur={changeComment}/>
                </div>
                <div className="col col-sm-2">
                    <ReactStars
                        count={5}
                        onChange={rate}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                <div className="col col-sm-2">
                    <Button onClick={addRecommendation}>Add</Button>
                </div>
            </div>
        </div>
    );
}

export default Video;