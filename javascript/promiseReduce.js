function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce((accum, current) => {
        return accum
            .then(accumValue => Promise.all([accumValue, current()]))
            .then(([accumValue, currentValue]) => reduce(accumValue, currentValue))
            .catch(err => { throw err });
    }, Promise.resolve(initialValue));
}
