/**
 * Calculates the edit distance between 2 words
 * @param {string} x First word
 * @param {string} y Second word
 */
function editDistance(x, y) {
    let matrix = new Array(x.length + 1).fill(0).map(() => new Array(y.length + 1).fill(0));

    for (let i = 0; i <= x.length; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= x.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= x.length; i++) {
        for (let j = 1; j <= y.length; j++) {
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + (x[i - 1] == y[i - 1] ? 0 : 1)
            );
        }
    }

    return matrix[x.length][y.length];
}

console.log(editDistance("dog", "cat")); // 3

module.exports = { editDistance };