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
    }
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
    
    let hasWon = checkWinner(board) === board.length ? true : false;
    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    const startBoard = this.state.board;
    return (
      <div>
        <h1>Lights Out</h1>
        <table className="Board">
          <tbody>
          {startBoard.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <Cell
                  key={`${i}-${j}`}
                  isLit={col}
                  flipCellsAroundMe={this.flipCellsAround}
                />
              ))}
            </tr>
          ))}
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
