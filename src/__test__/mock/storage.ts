/* eslint @typescript-eslint/no-dynamic-delete: 0 */

let storage: Record<string, string> = {};

global.Storage.prototype.setItem = vi.fn((key: string, value: string) => {
	if (key && value) {
		Object.assign(storage, { [key]: value });
	}
});

global.Storage.prototype.getItem = vi.fn((key: string) => storage[key] || null);

global.Storage.prototype.removeItem = vi.fn((key: string) => {
	delete storage[key];
});

global.Storage.prototype.clear = vi.fn(() => {
	storage = {};
});
