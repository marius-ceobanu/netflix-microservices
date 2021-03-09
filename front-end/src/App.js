import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import './App.css';
import MainPage from "./components/MainPage";
import Video from "./components/Video";

function App() {
    const storedJwt = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    const [jwt, setJwt] = useState(storedJwt || null);
    const[user, setUser] = useState(username || "none");

    return (
      <Router>
        <div className="App">
          <header className="App-header">
              <Header />
              <Route exact path={["/", "/home"]}>
                  <MainPage jwt={jwt} setToken={(token) => setJwt(token)} user={user} setUser={(user) => setUser(user)} />
              </Route>
              <Route path="/video/:id"
                     render={(props) => (
                         <Video {...props} token={jwt} />
                    )}
              />
          </header>
        </div>
      </Router>
    );
}

export default App;
