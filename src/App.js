import React, { Component } from 'react';

import classes from './App.css';
import BoardContainer from './containers/BoardContainer/BoardContainer';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <BoardContainer />
      </div>
    );
  }
}

export default App;
