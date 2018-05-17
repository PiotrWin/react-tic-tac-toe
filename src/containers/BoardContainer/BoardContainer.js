import React, { Component } from 'react';

import classes from './BoardContainer.scss';
import Controls from '../../components/Controls/Controls';
import Board from '../../components/Board/Board';
import ResetButton from '../../components/ResetButton/ResetButton';
import Wrapper from '../../hoc/Wrapper';

const timeout = 750;

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      marker: 'X',
      showControls: true,
      boardSize: 3,
    };
    this.changeBoardSize = this.changeBoardSize.bind(this);
    this.showBoard = this.showBoard.bind(this);
    this.winHandler = this.winHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.setMarker = this.setMarker.bind(this);
  }

  changeBoardSize(size) {
    this.setState({ boardSize: size });
  }

  showBoard() {
    this.setState({
      showControls: false
    });
  }

  setMarker(marker) {
    this.setState({ marker: marker });
  }

  winHandler(winner) {
    this.resetHandler();
  }

  resetHandler() {
    this.setState({ 
      started: false,
      marker: 'X',
      boardSize: 3,
      showControls: true
    });
  }

  render() {
    const controls = this.state.showControls ? (
      <div className={classes.Controls}>
        <Controls 
          show={this.state.showControls}
          start={this.showBoard}
          boardSizeChanged={this.changeBoardSize}
          boardSize={this.state.boardSize}
          changeMarker={this.setMarker}
          marker={this.state.marker}
        />
      </div>
    ) : null;
    const board = this.state.showControls ? null : (
      <div className={classes.Board}>
        <Board 
          show={!this.state.showControls}
          size={this.state.boardSize}
          marker={this.state.marker}
          onWin={this.winHandler}
        />
      </div>
    );
    const resetButton = this.state.showControls ? null : (
      <div className={classes.ResetButton}>
        <ResetButton 
          clicked={this.resetHandler}
          show={!this.state.showControls} 
        />
      </div>
    );
    return ( 
      <Wrapper>
        <div className={classes.BoardContainer}>
          {controls}
          {board}
        </div>
        {resetButton}
      </Wrapper>
    );
  }
}

export default BoardContainer;

