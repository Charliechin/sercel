import React from 'react';
import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import awsConfig from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Route, Routes } from 'react-router-dom';
import Rules from './components/Rules/Rules';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import Scoreboard from './components/Scoreboard/Scoreboard';
import UploadText from './components/UploadText/UploadText';

Amplify.configure(awsConfig)
//REST API endpoint: https://nj36t2qvxf.execute-api.eu-west-1.amazonaws.com/dev
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/scoreboard" element={<Scoreboard />}></Route>
        <Route path="/upload-text" element={<UploadText />}></Route>
      </Routes>
      <header className="App-header">Hello</header>
      {/* TODO: Sign out btn */}

    </div>
  );
}

export default withAuthenticator(App);
