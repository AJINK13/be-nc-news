exports.formatDates = list => {
    
    // Rest operator only works for primitive values such as strings, booleans, numbers. does not work for nested arrays, objects, and prototypes.
    // Hence we use JSON stringify and JSON parse to make copy for nested arrays, objects.

    let newArray = JSON.parse(JSON.stringify(list))
    for (let i = 0; i < newArray.length; i++) {
        newArray[i].created_at = new Date(newArray[i].created_at)
    }
    return newArray
}

exports.makeRefObj = list => {

};

exports.formatComments = (comments, articleRef) => {};
