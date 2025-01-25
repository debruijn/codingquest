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
input = input.split('\n').map(row => row.split(' ').map(el => parseInt(el)));

// Utility function to get distance between points (truncated)
let getDist = function(x, y) {
    return Math.trunc(Math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2));
}

// Find answer to question
let curr_row = input[0];
let dist = 0;
for (let i = 1; i < input.length; i++) {
    let new_row = input[i];
    dist += getDist(new_row, curr_row);
    curr_row = new_row;
}

// Print answer
console.log('Solution for ' + filename + ': ' + dist)
