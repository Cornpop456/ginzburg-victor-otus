function promiseReduce(asyncFunctions, reduce, initialValue) {
    return new Promise((resolve, reject) => {
        const result = asyncFunctions.reduce(async (accum, current) => {
            try {
                const currentValue = await current(),
                    accumValue = await accum;
                return reduce(accumValue, currentValue);

            } catch (err) {
                return reject(err);
            }
        }, initialValue);

        resolve(result);
    });
}
