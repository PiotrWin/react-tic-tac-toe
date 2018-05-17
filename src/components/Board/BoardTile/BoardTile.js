import React from 'react';

import classes from './BoardTile.scss';

const boardTile = props => {
  const tiles = [];
  const size = 100/(props.size)-0.85;
  return (
    <button
      className={classes.BoardTile}
      style={{
        width: `${size}%`, 
        height: `${size}%`,
        fontSize: `${size*10}%`
      }}
      data-id={props.id}
      data-content={props.content}
      disabled={props.isDisabled}>
      {props.content}
    </button>
  );
};

export default boardTile;