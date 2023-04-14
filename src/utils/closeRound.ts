const closeRound = (
	float: number,
	method: 'floor' | 'round' | 'ceil' = 'round',
	initial: number = 0.15,
	final: number = 0.85,
) => {
	if (float % 1 === 0) return float;
	if (float % 1 <= initial || float % 1 >= final) return Math[method](float);
	return float;
};

export default closeRound;
