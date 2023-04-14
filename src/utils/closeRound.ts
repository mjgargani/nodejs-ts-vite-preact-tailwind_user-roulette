const closeRound = (float: number) => {
	if (float % 1 === 0) return float;
	if (float % 1 <= 0.15 || float % 1 >= 0.85) return Math.round(float);
	return float;
};

export default closeRound;
