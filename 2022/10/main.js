import { Jimp } from "jimp";

// Run example or on actual input?
const run_example = false;  // Note that example doesn't really work because of PNG on website not being 15x15

// Read data
let filename = ''
if (run_example) {
    filename += 'example-fixed.png'
} else {
    filename += 'input.png'
}
const image = await Jimp.read(filename);

// Utility function to convert decimal number to 32bit and then binary
function decimalToBinary(N) {
    return (N >>> 0).toString(2);
}

let res = "";  // Final text
let buffer = "";  // Buffer that should be constructed towards 8 chars and then converted to CharCode.
for (let [id, el] of image.bitmap.data.entries()) {
    if (id % 4 === 0) {
        buffer += decimalToBinary(el).at(-1);
    }

    if (buffer.length === 8) {
        if (buffer === "00000000") {
            break
        }
        res += String.fromCharCode(parseInt(buffer, 2))
        buffer = "";
    }
}
// Uncomment this line to read the whole story
// console.log(res)

// Print answer
console.log('Solution for ' + filename + ': ' + res.split(' ').at(-1).slice(0, -1))
