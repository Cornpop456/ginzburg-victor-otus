function sum(value) {
	function inner(value) {
		if (!value) return inner.sum || 'Нет переданных значений';
		if (!inner.sum) inner.sum = 0;

		inner.sum += value;
		return inner;
	}

	return inner(value);
}

console.log(sum(1)(2)(3)());