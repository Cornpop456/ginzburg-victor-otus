async function asyncReduce(array, fn, initial) {
    if (!(array instanceof Array)) {
        throw new TypeError('Illegal first argument, (not an array)');
    } else if (!(fn instanceof Function)) {
        throw new TypeError('Illegal second argument, (not a function)');
    }

    let accum = initial;

    for (let i = 0; i < array.length; i++) {
        try {
            accum = await fn(accum, array[i], i, array);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    return accum;
}


function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncReduce(asyncFunctions, async (accum, current) => {
        try {
            const promise = current();

            const accumValue = await accum;
            const currentValue = await promise;

            return reduce(accumValue, currentValue);
        } catch (err) {
            throw err;
        }
    }, initialValue);
}
