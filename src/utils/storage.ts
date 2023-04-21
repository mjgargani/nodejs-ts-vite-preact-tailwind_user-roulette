export function get<T>(key: string): T | undefined {
	if (localStorage.getItem(key) === null) return undefined;
	return JSON.parse(localStorage.getItem(key)!) as T;
}

export function set<T>(key: string, value: T): void {
	if (Boolean(key) && value !== undefined && typeof value === 'object') {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export function del(key: string) {
	localStorage.removeItem(key);
}

export function cls() {
	localStorage.clear();
}
