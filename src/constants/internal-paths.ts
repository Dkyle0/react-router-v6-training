export const internalPaths = {
	home: '/',
	characters: '/characters',
	character: (alias: string): string => `/characters/${alias}`,
	episodes: '/episodes',
	episode: (alias: string): string => `/episodes/${alias}`,
	locations: '/locations',
	location: (alias: string): string => `/locations/${alias}`,
	secret: '/secret',
	login: '/login',
};
