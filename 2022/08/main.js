const fs = require('fs');

// Run example or on actual input?
const run_example = [false, 1, 2, 3][0];  // 1, 2 or 3 for examples or false for actual input

// Read data
let filename = ''
if (run_example) {
    filename += 'example' + run_example + '.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Additional inputs
let secret
let char_set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:?! '()";
let decode = false;
if (run_example === false) {
    secret = "Roads? Where We're Going, We Don't Need Roads.";
    decode = true;
} else if (run_example === 1) {
    secret = "SECRET";
    char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
} else if (run_example === 2) {
    secret = "With great power comes great responsibility";
} else {
    secret = "With great power comes great responsibility";
    decode = true;
}

// Find answer to question
let i = 0;
let out = "";
for (let char of input) {
    let ind = char_set.indexOf(secret.at(i));
    if (char_set.indexOf(char) < 0) {
        out += char;
    } else {
        let shift = decode ? (ind + 1) * -1 : (ind + 1);
        out += char_set.at((char_set.indexOf(char) + shift) % char_set.length);
    }
    i = (i + 1) % secret.length;
}

// Print answer
console.log('Solution for ' + filename + ': ' + out)
