import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';

import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
