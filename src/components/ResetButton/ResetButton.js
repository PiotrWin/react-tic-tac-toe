import React from 'react';

import classes from './ResetButton.scss';

const resetButton = props => {
  let attachedClasses = props.show ? 
    [classes.ResetButton, classes.Shown] :
    [classes.ResetButton, classes.Hidden];
  return (
    <button 
      className={attachedClasses.join(' ')}
      onClick={props.clicked}>
      RESET
    </button>
  );
};

export default resetButton;