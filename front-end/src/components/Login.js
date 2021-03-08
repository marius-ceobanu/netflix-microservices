import React from "react";
import axios from "axios";

function Login({ setToken, setFetchError }) {

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
            setToken(data.token);
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

                <button
                    type="button"
                    className="login-btn p-2 m-2"
                    onClick={() => submitLogin()}>Login</button>
            </div>
        </div>
    );
}

export default Login;