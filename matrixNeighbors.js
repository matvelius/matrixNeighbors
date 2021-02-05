var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lineIndex = 0
let matrix = []
var numberOfRows = 0
var numberOfColumns = 0
var y = 0
var x = 0
var outputArray = []

rl.on('line', function (line) {
    // console.log('current line: ', line)
    // console.log('current lineIndex: ', lineIndex)
    if (lineIndex == 0) { // 1st line: # of rows
        numberOfRows = parseInt(line)
        if (numberOfRows < 1 || numberOfRows > 1000) {
            rl.close()
        }
        // console.log(`numberOfRows: ${numberOfRows}`)
    } else if (lineIndex == 1) { // 2nd line: # of columns
        numberOfColumns = parseInt(line)
        if (numberOfColumns < 1 || numberOfColumns > 1000) {
            rl.close()
        }
        // console.log(`numberOfColumns: ${numberOfColumns}`)
    } else { // each subsequent line is a row in the matrix (except the last two, which are coordinates)

        if (lineIndex == numberOfRows + 2) { // second to last line
            y = parseInt(line)
            if (y < 0) { rl.close() }
            // console.log(`y: ${y}`)
        } else if (lineIndex == numberOfRows + 3) { // last line
            x = parseInt(line)
            if (x < 0) { rl.close() }
            // console.log(`x: ${x}`)

            // at this point, we have the entire input
            // console.log(`matrix:`)
            // console.log(matrix)

            // left
            if (x - 1 >= 0) {
                outputArray.push(matrix[y][x - 1])
            }
            // right
            if (x + 1 < numberOfColumns) {
                outputArray.push(matrix[y][x + 1])
            }
            // above 
            if (y - 1 >= 0) {
                outputArray.push(matrix[y - 1][x])
            }
            // below
            if (y + 1 < numberOfRows) {
                outputArray.push(matrix[y + 1][x])
            }

            if (outputArray.length != 0) {
                console.log(outputArray.sort().join(' '))
            }

            rl.close()

        } else { // all other lines are matrix rows
            // console.log(lineIndex)
            matrix.push(line.split(' ').map(item => parseInt(item)))
        }
    }
    lineIndex += 1
})