const fs = require('fs');

// Run example or on actual input?
const run_example = false;  // 1 or 2 for examples or false for actual input

// Read data
let filename = ''
if (run_example) {
    filename += 'example' + run_example + '.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Determine grid size based on which input we read
let size;
if (run_example === 1) {
    size = [10, 10];
} else if (run_example === 2) {
    size = [100, 100];
} else {
    size = [20000, 100000];
}

// Process data -> no longer top left pt and size but top left pt and bottom right pt (not including)
input = input.split('\n')
    .map(x => x.split(' ').map(y => parseInt(y)));
input = input.map(x => [x[0], x[1], x[0] + x[2], x[1] + x[3]])

// Find answer to question: compare each new rectangle to list of open rectangles (which starts with full grid)

let uncovered_rectangles = [[0, 0, size[0], size[1]]];
let new_rectangles = [];

const pushIfNotEmpty = function(arr, area) {
    if (area[2] !== area[0] && area[3] !== area[1]) {
        arr.push(area)
    }
}

for (let tile of input) {
    for (let rect of uncovered_rectangles) {
        // tile not in rect -> do nothing ( e.g. add rect to new)
        if (tile[0] >= rect[2] || rect[0] >= tile[2] || rect[1] >= tile[3] || tile[1] >= rect[3]) {
            new_rectangles.push(rect);
            continue
        }

        // tile encompasses rect fully -> remove fully (e.g. not add to new)
        if (tile[0] <= rect[0] && tile[2] >= rect[2] && tile[1] <= rect[1] && tile[3] >= rect[3]) {
            continue
        }

        // tile partially overlaps -> create new rectangle(s) to add to new on all 8 sides - only add if not empty
        pushIfNotEmpty(new_rectangles,
            [rect[0], rect[1], Math.max(rect[0], tile[0]), Math.max(rect[1], tile[1])]);
        pushIfNotEmpty(new_rectangles,
            [Math.max(rect[0], tile[0]), rect[1], Math.min(rect[2], tile[2]), Math.max(rect[1], tile[1])]);
        pushIfNotEmpty(new_rectangles,
            [Math.min(rect[2], tile[2]), rect[1], rect[2], Math.max(rect[1], tile[1])]);

        pushIfNotEmpty(new_rectangles,
            [rect[0], Math.max(rect[1], tile[1]), Math.max(rect[0], tile[0]), Math.min(rect[3], tile[3])]);
        pushIfNotEmpty(new_rectangles,
            [Math.min(rect[2], tile[2]), Math.max(rect[1], tile[1]), rect[2], Math.min(rect[3], tile[3])]);

        pushIfNotEmpty(new_rectangles,
            [rect[0], Math.min(rect[3], tile[3]), Math.max(rect[0], tile[0]), rect[3]]);
        pushIfNotEmpty(new_rectangles,
            [Math.max(rect[0], tile[0]), Math.min(rect[3], tile[3]), Math.min(rect[2], tile[2]), rect[3]]);
        pushIfNotEmpty(new_rectangles,
            [Math.min(rect[2], tile[2]), Math.min(rect[3], tile[3]), rect[2], rect[3]]);
    }
    // Use new_rectangles as new result, and start empty new_rectangles for next iteration.
    uncovered_rectangles = new_rectangles;
    new_rectangles = [];
}

const getTotalSize = function(rectangles) {
    // Get total size of rectangles for an array of rectangles
    let sum = 0;
    for (let rect of rectangles) {
        sum += (rect[2] - rect[0]) * (rect[3] - rect[1]);
    }
    return sum
}

// Print answer
console.log('Solution for ' + filename + ': ' + getTotalSize(uncovered_rectangles))
