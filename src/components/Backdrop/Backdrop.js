import React from 'react';

import classes from './Backdrop.scss';

const backdrop = props => (
  <div 
    className={classes.Backdrop}
    onClick={props.continue}>
  </div>
);

export default backdrop; 