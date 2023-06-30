const storage = {
	get: (key: string, _default: string | number | boolean | string[] | number[]) => {
		try {
			const data = JSON.parse(localStorage.getItem(key) || 'null');
			if (data == null) {
				return _default || undefined;
			}
			return data;
		} catch (error) {
			return _default || undefined;
		}
	},
	set: (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
		return localStorage.getItem(key);
	},
	remove: (key: string) => {
		localStorage.removeItem(key);
	},
	clear: () => {
		localStorage.clear();
	},
};

export default storage;
