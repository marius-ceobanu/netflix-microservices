import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { Link } from "react-router-dom";

// import netflix_logo from '../img/netflix-logo-black-and-white.png';

function AllVideos({ videos }) {
    return (
        <CardColumns className="d-flex m-5">
            {videos.map((video, i) => (
                <Link to={`/video/${video.id}`} key={i}>
                    <Card className="d-flex bg-danger text-black p-1" key={i}>
                        <Card.Body className={"p-0"}>
                            <Card.Title>{video.name}</Card.Title>
                        </Card.Body>
                        <Card.Img variant="bottom" src={netflix_logo} alt="Card image" style={imgStyle} />
                    </Card>
                </Link>
            ))}
        </CardColumns>
    );
}

const imgStyle = {
    height: 'auto',
    maxHeight: '270px',
    width: 'auto',
    maxWidth: '270px'
};

export default AllVideos;