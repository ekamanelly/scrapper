function findPreviousSpaceIndex(destructuredString, onlySlash) {
    for (i = onlySlash; i > 0; --i) {
        if (destructuredString[i] == ' ') {
            return i
        }
    }
}

module.exports.trimSmartfromString = function (string) {
    let slashIndexes = [];
    let destructuredString = [...string];
    console.log(slashIndexes)
    console.log(destructuredString)
    destructuredString.map((cur, index) => {
        if (cur == '/') {
            slashIndexes.push(index)
        }
    })
    console.log(slashIndexes)
    if (slashIndexes.length == 2) {
        return string.slice(slashIndexes[0] + 1, slashIndexes[1])
    } else {
        return string.slice(
            findPreviousSpaceIndex(destructuredString, slashIndexes[0] - 2) + 1,
            slashIndexes[0] - 1)
    }
}