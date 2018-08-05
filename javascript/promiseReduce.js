async function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce((accum, current) => {
        //при первом запуске, accum не является промисом
        if (!accum.then) accum = Promise.resolve(accum);
        return accum
            .then(accumValue => Promise.all([accumValue, current()]))
            .then(([accumValue, currentValue]) => reduce(accumValue, currentValue))
            .catch(err => { console.log("Произошла ошибка!"); throw err });
    }, initialValue);
}
