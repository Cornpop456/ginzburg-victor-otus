function promiseReduce(asyncFunctions, reduce, initialValue) {
	let accum = initialValue;

	return new Promise((resolve, reject) => {
		const processFunctions = (fns) => {
			if (fns.length === 0) return resolve(accum);

			let currentFn = fns[0];
			fns = fns.slice(1);
			
			return currentFn()
				.then(res => {
					accum = reduce(accum, res);
					return fns;
				})
				.then(processFunctions);
		}

		processFunctions(asyncFunctions);
	});
}
