import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//             {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
        {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    renderSquare(i) {
        return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = `Winner is Player ${winner}!`;
        // } else if (this.state.squares.every(e => e !== null)) {
        //     status = `Game is a draw :(`;
        // } else {
        //     status = `It is Player ${this.state.xIsNext ? 'X' : 'O'}'s turn!`;//'Next player: X';
        // }

        return (
            <div className='board'>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const locations = [
            [1,1],
            [2,1],
            [3,1],
            [1,2],
            [2,2],
            [3,2],
            [1,3],
            [2,3],
            [3,3]
        ]

        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const location = locations[i];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: location,
                player: squares[i],
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ?
                `Go to move #${move} (${history[move].player} - ${history[move].location})` :
                `Go to game start`;
            return (
                <li key={move}>
                    <button className={move === this.state.stepNumber ? 'btn btn-primary btn-sm my-1' : 'btn btn-secondary btn-sm my-1'} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner is Player ${winner}!`;
        } else if (current.squares.every(e => e !== null)) {
            status = `Game is a draw :(`;
        } else {
            status = `It is Player ${this.state.xIsNext ? 'X' : 'O'}'s turn!`;//'Next player: X';
        }

        return (
            <main className="game">
            
                <div className="game-board d-flex justify-content-center flex-column">
                <div className='status'>{status}</div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info d-flex justify-content-center align-items-start flex-column">
                    
                    <ol>{moves}</ol>
                </div>
            </main>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }