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

// Process data into numbers and throw out last line if there.
let nums = input.split('\n')
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));

// Get rolling average and compare to boundary
let countOutside = 0;
for (let i = 0; i<=nums.length-60; i++) {
    let mov_avg = nums.slice(i, i+60).reduce((a, b) => a + b, 0) / 60;
    if ((mov_avg > 1600) || (mov_avg < 1500)) {
        countOutside += 1;
    }
}

// Print answer
console.log('Solution for ' + filename + ': ' + countOutside)
