function getAngle(id: string): number | false {
	const card = document.getElementById('user-card-0') as HTMLElement;
	const styles = window.getComputedStyle(card, null);
	const attr =
		styles.getPropertyValue('-webkit-transform') ||
		styles.getPropertyValue('-moz-transform') ||
		styles.getPropertyValue('-ms-transform') ||
		styles.getPropertyValue('-o-transform') ||
		styles.getPropertyValue('transform') ||
		false;
	if (!attr) return false;
	const values = attr!.split('(')[1].split(')')[0].split(',');
	const angle = Math.asin(Number(values[1])) * (180 / Math.PI);
	return angle;
}

export default getAngle;
