import React from 'react';

import classes from './Controls.scss';

const controls = props => {
  return (
    <div className={classes.Controls}>
      <h1>Tic tac toe!</h1>
      <p>Set board size:</p>
      <input 
        type="number" 
        min="3" max="10" 
        value={props.boardSize}
        onChange={
          event => (event.target.value > 10 || event.target.value < 3)
            ? null : props.boardSizeChanged(event.target.value)}
      />
      <p className={classes.choose}>Choose symbol:
        <br />(player 1)
      </p>
      <span>
        <button 
          className={props.marker === 'X' ? classes.Active : null}
          onClick={() => props.changeMarker('X')}>
          X
        </button>
        <button 
          className={props.marker === 'O' ? classes.Active : null}
          onClick={() => props.changeMarker('O')}>
          O
        </button>
      </span>
      <button className={classes.startButton} onClick={props.start}>
        START
      </button>
    </div>
  );
};

export default controls;