const fs = require('fs');
const { createHmac, createHash } = require('crypto');

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
input = input.split('\n')
    .map(row => row.split('|'))

// Initialize some variables
let curr_res = "0000000000000000000000000000000000000000000000000000000000000000";
let error_detected = false;

// Utility function to perform the mining for the broken hash and the entries after
function runMining(row, curr_res) {
    let num = 0;
    while (true) {
        let hash = createHash('sha256');
        let new_res = hash.update(row[0] + '|' + num + '|' + curr_res).digest('hex');
        if (new_res.slice(0, 6) === '000000') {
            console.log('new hash for ' + row[0] + ': number' + num + ' & result ' + new_res);
            return new_res;
        }
        num += 1;
    }
}

// Check each hash until the broken one is found; then run mining for that one and each record after
for (let row of input) {
    let hash_input;
    if (error_detected) {
        curr_res = runMining(row, curr_res);
        continue;
    }
    let hash = createHash('sha256');
    hash_input = row.slice(0, 3).join('|');
    hash.update(hash_input);
    if (hash.digest('hex') === row[3]) {
        curr_res = row[3];
        console.log('ok hash for ' + row[0] + ': ' + row[3]);
        continue
    }
    error_detected = true;
    curr_res = runMining(row, curr_res);
}

// Print answer
console.log('\nSolution for ' + filename + ': ' + curr_res)
