import React from 'react';

import classes from './Modal.scss';

const modal = props => {
  const winner = props.winner == 'T' ? 'Draw!' : `Winner: ${props.winner}`;
  return (
    <div className={classes.Modal}>
      <p>Game over!</p>
      <p>{winner}</p>
      <button onClick={props.continue}>OK</button>
    </div> 
  );
};

export default modal;