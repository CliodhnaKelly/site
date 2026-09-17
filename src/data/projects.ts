export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	repoUrl: string;
	demoUrl?: string;
	order: number;
}

const GITHUB = 'https://github.com/CliodhnaKelly';

export const projects: Project[] = [
	{
		id: 'flashcards',
		title: 'Flashcards',
		description: 'Spaced repetition for hand-drawn notes — Excalidraw cards scheduled with FSRS.',
		techStack: ['Next.js', 'TypeScript', 'Supabase'],
		repoUrl: `${GITHUB}/flashcards`,
		order: 1,
	},
	{
		id: 'pr-radar',
		title: 'PR Radar',
		description: 'IntelliJ plugin that keeps GitHub PRs needing your attention in a sidebar, with notifications.',
		techStack: ['Java', 'IntelliJ Platform', 'GraphQL'],
		repoUrl: `${GITHUB}/pr-radar`,
		order: 2,
	},
	{
		id: 'hand-gestures',
		title: 'Hand Gestures',
		description: 'Webcam hand-gesture recognition in the browser. No build step, no backend.',
		techStack: ['JavaScript', 'MediaPipe', 'Canvas'],
		repoUrl: `${GITHUB}/hand-gestures`,
		order: 3,
	},
	{
		id: 'obsidian-linear-quickadd',
		title: 'Obsidian → Linear',
		description: 'QuickAdd script that turns an Obsidian todo into a Linear issue and links it back.',
		techStack: ['JavaScript', 'Obsidian', 'Linear API'],
		repoUrl: `${GITHUB}/obsidian-linear-quickadd`,
		order: 4,
	},
	{
		id: 'witch-game',
		title: 'The Little White Witch',
		description: 'A pastel 3D collectathon platformer prototype in the spirit of the late 90s.',
		techStack: ['Godot 4', 'GDScript'],
		repoUrl: `${GITHUB}/witch-game`,
		order: 5,
	},
	{
		id: 'flink-sql',
		title: 'Flink SQL Playground',
		description: 'Spring Boot service that runs Flink SQL against Kafka topics for streaming experiments.',
		techStack: ['Java', 'Apache Flink', 'Kafka'],
		repoUrl: `${GITHUB}/flink-sql`,
		order: 6,
	},
	{
		id: 'wardrobe',
		title: 'Wardrobe',
		description: 'A virtual wardrobe: catalogue clothes, build outfits, track cost per wear.',
		techStack: ['Ideas', 'Coming soon'],
		repoUrl: `${GITHUB}/wardrobe`,
		order: 7,
	},
	{
		id: 'site',
		title: 'This Site',
		description: 'The retro profile you are looking at. Best viewed with glitter mode enabled.',
		techStack: ['Astro', 'CSS', 'Nostalgia'],
		repoUrl: `${GITHUB}/site`,
		demoUrl: 'https://www.cliodhnas.com',
		order: 8,
	},
];
