const fs = require('fs');

// Run example or on actual input?
const run_example = false;
const winningNumbers = new Set([12, 48, 30, 95, 15, 55, 97]);

// Read data
let filename = ''
if (run_example) {
    filename += 'example.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Process data: single string to array of integer-arrays.
input = input.split('\n');
input = input.map(
    x => x
        .split(' ')
        .map(y => parseInt(y))
);

// Utility function to convert number of matches to winnings for each ticket
let countToWinnings = count => {
    switch (true) {
        case count === 6:
            return 1000
        case count === 5:
            return 100
        case count === 4:
            return 10
        case count === 3:
            return 1
        case count <= 2:
            return 0
    }
};

// Find answer to question: for each row, count how many are in winningNumbers.
let winnings = 0
for (let row of input) {
    let count = 0;
    for (let el of row) {
        if (winningNumbers.has(el)) {
            count += 1;
        }
    }
    winnings += countToWinnings(count)
}

// Print answer
console.log('Solution for ' + filename + ': ' + winnings)
