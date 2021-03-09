import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function Login({ setToken, setFetchError, setUser }) {

    const submitLogin = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:8762/netflix/account/login`,
                {
                        username: document.getElementById("username").value,
                        password: document.getElementById("password").value,
                    }
            );
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.username);
            setToken(data.token);
            setUser(data.username);
            setFetchError(null);
        } catch (err) {
            setFetchError(err.message);
        }
    }

    return(
        <div className="inner-container p-5">
            <div className="box p-5">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="login-input p-2 m-2"
                        placeholder="Username"/><br/>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="login-input p-2 m-2"
                        placeholder="Password"/><br/>

                <Button
                    type="button"
                    className="login-btn p-2 m-2"
                    onClick={() => submitLogin()}>Login</Button>
            </div>
        </div>
    );
}

export default Login;