import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import './App.css';
import MainPage from "./components/MainPage";
import Video from "./components/Video";

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
              <Header />
              <Route exact path={["/", "/home"]}>
                  <MainPage />
              </Route>
              <Route path="/video/:id" component={Video} />
          </header>
        </div>
      </Router>
  );
}

export default App;
