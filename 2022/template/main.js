const fs = require('fs');

// Run example or on actual input?
const run_example = true;

// Read data
let filename = ''
if (run_example) {
    filename += 'example.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Process data if needed
// TODO

// Find answer to question
// TODO

// Print answer
console.log('Solution for ' + filename + ': ' + 'TODO')
