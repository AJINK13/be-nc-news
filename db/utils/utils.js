exports.formatDates = list => {

    for (let i = 0; i < list.length; i++) {
        list[i].created_at = new Date(list[i].created_at)
    }
    return list
}

exports.makeRefObj = list => {

};

exports.formatComments = (comments, articleRef) => {};
