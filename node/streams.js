const { Readable, Writable, Transform } = require('stream');

const genRandNumbers = new Readable({
    objectMode: true,
    highWaterMark: 1000,
    read(size) {
        try {
            if (this.times-- <= 0) return this.push(null);
            const randNumber = Math.round(Math.random() * 100000);
            this.push(randNumber);
        } catch (err) {
            this.emit('error', err);
        }
    }
});

const addNumber = new Transform({
    objectMode: true,
    highWaterMark: 1000,
    transform(chunk, encoding, callback) {
        try {
            const randNumber = Math.round(Math.random() * 100000);
            const transformed = chunk + randNumber;
            this.push({
                initialData: chunk,
                additionalData: randNumber,
                newData: transformed
            });
            callback();
        } catch (err) {
            callback(err);
        }
    }
});

const prindData = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        setTimeout(() => {
            try {
                process.stdout.write(JSON.stringify(chunk, null, 4) + '\n\n');
                callback();
            } catch (err) {
                callback(err);
            }
        }, 1000);

    }
});

genRandNumbers.on('error', () => {
    throw new Error("Произошла ошибка при чтении!");
})

addNumber.on('error', () => {
    throw new Error("Произошла ошибка при трансформации!");
})

prindData.on('error', () => {
    throw new Error("Произошла ошибка при записи!");
});


/**
 * Function combining three streams.
 * @param {number} times - How many numbers to generate, if no value passed - infinite times
 */
function streamsApp(times = Infinity) {
    genRandNumbers.times = times;

    genRandNumbers
        .pipe(addNumber)
        .pipe(prindData);
}

streamsApp(5);