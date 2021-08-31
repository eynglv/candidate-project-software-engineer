import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        {/* <Redirect to='/home' /> */}
        <Route path='/home' component={Home} />
        <Route exact path='/game' component={Game}></Route>
      </div>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
