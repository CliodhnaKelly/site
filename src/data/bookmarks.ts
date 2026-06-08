export interface Bookmark {
	id: string;
	title: string;
	url: string;
	source?: string;
	dateString?: string;
	note?: string;
}

export const bookmarks: Bookmark[] = [
	{
		id: 'theyre-made-out-of-weights',
		title: 'They\'re made out of weights',
		url: 'https://maxleiter.com/blog/weights',
		note: 'Funny',
	},
	{
		id: 'roadmap',
		title: 'SWE Roadmap',
		url: 'https://roadmap.sh/'
	},
];
