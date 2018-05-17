import React, { Component } from 'react';

import classes from './Board.scss';
import BoardTile from './BoardTile/BoardTile';
import Wrapper from '../../hoc/Wrapper';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      marker: this.props.marker,
      winner: '',
      counter: 0
    };
    this.boardClickHandler = this.boardClickHandler.bind(this);
    this.checkGameState = this.checkGameState.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const board = [];
    for (let i = 0; i < nextProps.size; i++) {
      let row = [];
      for (let j = 0; j < nextProps.size; j++)
        row.push(' ');
      board.push(row);
    }

    return {
      board: board,
      marker: nextProps.marker,
      winner: '',
    };
  }

  boardClickHandler(event) { 
    const tile = event.target;
    if (tile.getAttribute('data-content') === ' ') {
      let board = [...this.state.board];
      const id = tile.getAttribute('data-id');
      board[id[0]][id[1]] = this.state.marker;
      this.setState((prevState, props) => {
        return {
          marker: prevState.marker === 'X' ? 'O' : 'X',
          board: board,
          classes: [classes.Board, classes.Shown],
          counter: this.state.counter + 1
        };
      });
      const winner = this.checkGameState();
      if (winner) {
        this.setState({ 
          winner: winner,
          showBackdrop: true
        });
      }
      else if (this.state.counter == 
        this.state.board.length*this.state.board.length - 1) {
        this.setState({ 
          winner: 'T',
          showBackdrop: true
        });
      }
    }
  }

  checkGameState() {
    const board = [...this.state.board];
    let boardFragment = [];
    const n = board.length;
    let winner = '';

    function getWinner(arr) {
      if (arr.every(e => e === 'X')) return 'X';
      else if (arr.every(e => e === 'O')) return 'O';
    }

    for (let i = 0; i < n; i++) {
      boardFragment = board[i];
      winner = getWinner(boardFragment);
      if (winner) return winner;
    }

    for (let i = 0; i < n; i++) {
      boardFragment = [];
      for (let j = 0; j < n; j++) 
        boardFragment.push(board[j][i]);
      winner = getWinner(boardFragment);
      if (winner) return winner;
    }
    
    boardFragment = [];
    for (let i = 0; i < n; i++)
      boardFragment.push(board[i][i]);
    winner = getWinner(boardFragment);
    if (winner) return winner;

    boardFragment = [];
    for (let i = 0; i < n; i++) {
      for (let j = n-1; j >= 0; j--)
        if (j === n-i-1) boardFragment.push(board[i][j]);
    }
    winner = getWinner(boardFragment);
    if (winner) return winner;
  }

  render() {
    let tiles = [...Array(this.props.size*this.props.size)]
      .map((el, id) => {
        const row = Math.floor(id / this.props.size);
        const col = id % this.props.size;
        const isDisabled = this.state.board[row][col] !== ' ' ? true : false;
        return (
          <BoardTile 
            size={this.props.size}
            key={id}
            id={`${row}${col}`}
            content={this.state.board[row][col]}
            isDisabled={isDisabled}
          />
        );
      });
    const backdropAndModal = this.state.showBackdrop ? (
      <Wrapper>
        <Backdrop continue={this.props.onWin}/>
        <Modal continue={this.props.onWin} winner={this.state.winner}/>
      </Wrapper> ) : null;
    return (
      <Wrapper>
        {backdropAndModal}
        <span className={classes.TurnInfo}>
          <div>Current turn: </div>
          <div>{this.state.marker}</div>
        </span>
        <div 
          className={classes.Board}
          onClick={evt => this.boardClickHandler(evt)}>
          {tiles}
        </div>
      </Wrapper>
    );
  }
}

export default Board;
