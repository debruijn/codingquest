const fs = require('fs');

// Run example or on actual input?
const run_example = false;

// Read data
let filename = ''
if (run_example) {
    filename += 'example.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Process data if needed
input = input.split('\n').map(row => row.split('').map(el => parseInt(el)));
let wins = [0, 0, 0];




// Utility function to check grid
let checkPlayer = function(grid, player) {
    let player_coords = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === player) {
                player_coords.push([i, j]);
            }
        }
    }


}


let checkWinner = function(grid, col) {
    let player = grid[col].at(-1);
    // Check vertically
    if (grid[col].slice(-4, -1).filter(x => x === player).length >= 3) {
        return true;
    }
    // Check horizontally
    let height = grid[col].length - 1;
    let run_horizontally = grid.map(x => x[height])
        .map(x => x === player)
        .reduce((a, b) => {
            if (a === 4) {
                return 4
            } else if (b) {
                return a + 1
            } else {
                return 0
            }
        }, 0);
    if (run_horizontally === 4) {
        return true
    }

    // Check diagonally
    let diagonal = [];
    for (let i = -6; i <= 7; i++) {
        if ((col + i >= 0) && (col + i < 7)) {
            diagonal.push(grid[col + i][height + i]);
        }
    }
    let run_diagonally1 = diagonal
        .map(x => x === player)
        .reduce((a, b) => {
            // console.log(a, b);
            if (a === 4) {
                return 4
            } else if (b) {
                return a + 1
            } else {
                return 0
            }
        }, 0);
    if (run_diagonally1 === 4) {
        return true
    }

    diagonal = [];
    for (let i = -6; i <= 7; i++) {
        if ((col + i >= 0) && (col + i < 7)) {
            diagonal.push(grid[col + i][height - i]);
        }
    }
    let run_diagonally2 = diagonal
        .map(x => x === player)
        .reduce((a, b) => {
            // console.log(a, b);
            if (a === 4) {
                return 4
            } else if (b) {
                return a + 1
            } else {
                return 0
            }
        }, 0);
    if (run_diagonally2 === 4) {
        return true
    }

    return false;
}


// Find answer to question
for (let row of input) {
    let grid = [[],[],[],[],[],[],[]]
    let curr_player = 0;
    for (let el of row) {
        curr_player = (curr_player % 3) + 1;
        grid[el - 1].push(curr_player);
        let winner = checkWinner(grid, el - 1);
        if (winner) {
            wins[curr_player - 1] += 1;
            break
        }
    }
}

// Print answer
console.log('Solution for ' + filename + ': ' + wins.reduce((a, b) => a * b, 1));
