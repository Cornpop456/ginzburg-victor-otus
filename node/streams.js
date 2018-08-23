const { Readable, Writable, Transform } = require('stream');

/**
 * Class representing a stream of random numbers.
 * @extends Readable
 */
class RandomStream extends Readable {
  /**
   * Create a stream.
   * @param {Object} options - Options passing to super.
   * @param {number} times - How many numbers to generate.
   */
  constructor(options, times) {
    super(options);
    this.times = times;
  }

  /**
   * Implementetation of Readable's _read method.
   */
  _read(size) {
    try {
      if (this.times <= 0) return this.push(null);

      this.times -= 1;

      const randNumber = Math.round(Math.random() * 100000);
      this.push(randNumber);
    } catch (err) {
      this.emit('error', err);
    }
  }
}

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

/**
 * Set error handlers on streams
 * @param {Stream[]} streams - Array of streams.
 * @param {string[]} reasons - Array of error reasons.
 */
function setErrorHandlers(streams, reasons) {
  streams.forEach((stream, i) => {
    stream.on('error', () => {
      throw new Error(`Произошла ошибка при ${reasons[i]}!`);
    });
  });
}

/**
 * Function combining three streams.
 * @param {number} times - How many numbers to generate, if no value passed - infinite times.
 */
function streamsApp(times = Infinity) {
  const genRandNumbers = new RandomStream(
    {
      objectMode: true,
      highWaterMark: 1000
    },
    times
  );

  setErrorHandlers([genRandNumbers, addNumber, prindData], ['чтении', 'трансформации', 'записи']);

  genRandNumbers.pipe(addNumber).pipe(prindData);
}

streamsApp(5);
