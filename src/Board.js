import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
      nRows: 5,
      nCols: 5,
      chanceLightStartsOn: 0.5
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nRows; i++) {
      let row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        let randFloat = Math.random();
        let isLit = randFloat >= this.props.chanceLightStartsOn;
        row.push(isLit);
      }
      board.push(row);
    }
    // board.map(row => row.fill(0))
    // board.map(row => row.map(element => element + Math.random()))
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
      return board;
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    function checkWinner(arr) {
      let counter = 0;
      const isTrue = (currentValue) => currentValue === true;
      for (const row of arr) {
        counter += row.every(!isTrue) ? 1 : 0;
      }
      return counter;
    }
    
    
    // this.setState({board: });
  }


  /** Render game board or winning message. */

  render() {
    const startBoard = this.state.board;
    let tblBoard = [];
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(<Cell isLit={this.state.board[y][x]} />)
      }
      tblBoard.push(<tr>{row}</tr>)
    }
    return (
      <div>
        <h1>Lights Out</h1>
        <table className="Board">
          <tbody>
          {tblBoard}
          </tbody>
        </table>
      </div>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
