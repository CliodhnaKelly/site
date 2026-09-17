export interface Theme {
	id: string;
	label: string;
	color: string;
}

/** 'pink' is the default skin — it has no [data-theme] block; the others must each have one in global.css. */
export const themes: Theme[] = [
	{ id: 'pink',   label: 'Bebo Pink',        color: '#e1198d' },
	{ id: 'purple', label: 'Purple Princess',  color: '#9c27b0' },
	{ id: 'blue',   label: 'MSN Blue',         color: '#0870bd' },
	{ id: 'lime',   label: 'Neon Lime',        color: '#66bb00' },
];
