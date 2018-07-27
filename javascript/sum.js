function sum(value) {
	if (!arguments.length) return 'Нет переданных значений';
	
	function inner(value) {
		if (!arguments.length) return inner.sum;
		inner.sum += value;
		return inner;
	}
	inner.sum = value;
	return inner;
}

console.log(sum(1)(2)(3)());
