const fs = require('fs');

// Run example or on actual input?
const run_example = false;

// Read data
let filename = ''
if (run_example) {
    filename += 'example' + run_example + '.txt'
} else {
    filename += 'input.txt'
}
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Process data if needed
input = input.split('\n');

// Initialize registry
let i = 0;
let lastCheck = false;
let registry = new Map();
for (let i = 65; String.fromCharCode(i) !== 'M'; i++) {
    registry.set(String.fromCharCode(i), 0);
}

let output = "";
while (i < input.length) {
    let this_cmd = input[i].split(' ');
    let val = 0;
    if (this_cmd.length >= 3) {
        if (isNaN(parseInt(this_cmd[2]))) {
            val = registry.get(this_cmd[2]);
        } else {
            val = parseInt(this_cmd[2])
        }
    }
    console.log(i + ': ' + this_cmd);

    switch (this_cmd[0]) {
        case "END": i += 1; break;  //return;
        case "ADD": {
            let old_val = registry.get(this_cmd[1]);
            registry.set(this_cmd[1], old_val + val);
            i += 1;
            break
        }
        case "MOD": {
            let old_val = registry.get(this_cmd[1]);
            registry.set(this_cmd[1], old_val % val);
            i += 1;
            break
        }
        case "DIV": {
            let old_val = registry.get(this_cmd[1]);
            registry.set(this_cmd[1], Math.floor(old_val / val));
            i += 1;
            break
        }
        case "MOV": {
            registry.set(this_cmd[1], val);
            i += 1;
            break
        }
        case "JMP": {
            i += parseInt(this_cmd[1])
            break
        }
        case "JIF": {
            if (lastCheck) {
                i += parseInt(this_cmd[1])
            } else {
                i += 1
            }
            break
        }
        case "CEQ": {
            lastCheck = registry.get(this_cmd[1]) === val;
            i += 1;
            break
        }
        case "CGE": {
            lastCheck = registry.get(this_cmd[1]) >= val;
            i += 1;
            break
        }
        case "OUT": {
            if (isNaN(parseInt(this_cmd[1]))) {
                val = registry.get(this_cmd[1]);
            } else {
                val = parseInt(this_cmd[1])
            }
            i += 1;
            output += val + " ";
        }
    }
}

// Print answer
console.log('Solution for ' + filename + ': ' + output)
