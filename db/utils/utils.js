exports.formatDates = articleData => {
    
    // Rest operator only works for primitive values such as strings, booleans, numbers. Does not work for nested arrays, objects, and prototypes.
    // Hence we use JSON stringify and JSON parse to make copy for nested arrays and objects.

    let newArticleDataArr = JSON.parse(JSON.stringify(articleData))

    for (let i = 0; i < newArticleDataArr.length; i++) {
        newArticleDataArr[i].created_at = new Date(newArticleDataArr[i].created_at)
    }

    return newArticleDataArr
}

exports.makeRefObj = articleRows => {

    return articleRows.reduce((refObj, articleRow) => {
        
        refObj[articleRow.title] = articleRow.article_id
        return refObj
    }, {})
};

exports.formatComments = (comments, articleRef) => {};
