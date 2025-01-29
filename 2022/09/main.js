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

// Process data
input = input.split('\n')
    .map(x => x.split(''));
let open = [];
let start = [0, 0];
let target = [0, 0];
for (let [i, row] of input.entries()) {
    for (let [j, el] of row.entries()) {
        if (el === ' ') {
            open.push([i, j]);
            if (i === 0) {
                start = [i, j];
            } else if (i === input.length - 1) {
                target = [i, j];
            }
        }
    }
}

// Utility class to allow adding array to Set and test inclusion of a new array in it
class ArraySet extends Set {
    add(arr) {
        super.add(arr.toString());
    }
    has(arr) {
        return super.has(arr.toString());
    }
}

// Utility function to get neighbors of a point
const getNeighbors = function(pt) {
    return [
        [pt[0], pt[1] - 1],
        [pt[0], pt[1] + 1],
        [pt[0] - 1, pt[1]],
        [pt[0] + 1, pt[1]]
    ]
}

// Initialize / convert open points, queue and history for use in BFS, and final result
open = new ArraySet(open);
let queue = [[start, 1]];
let hist = new ArraySet([start]);
let result;

// BFS: pop item / test for target / add neighbors to queue and hist if new and open points
while (true) {
    let [loc, steps] = queue.shift();

    if (loc[0] === target[0] && loc[1] === target[1]) {
        result = steps;
        break;
    }

    let neighbors = getNeighbors(loc);
    for (let nghbr of neighbors) {
        if ((!open.has(nghbr)) || hist.has(nghbr)) {
            continue
        }
        hist.add(nghbr);
        queue.push([nghbr, steps + 1]);
    }
}

// Print answer
console.log('Solution for ' + filename + ': ' + result)
