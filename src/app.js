import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Player from './pages/player';

ReactDOM.render(
    <div>
        <Header />
        <Player />
    </div>,
    document.getElementById('root')
);
