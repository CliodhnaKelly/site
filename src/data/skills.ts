export interface Skill {
	name: string;
	proficiency: number; // 0–100, drives the retro progress bar
}

export interface SkillCategory {
	category: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		category: 'Languages',
		skills: [
			{ name: 'TypeScript', proficiency: 85 },
			{ name: 'Java', proficiency: 85 },
			{ name: 'SQL', proficiency: 70 },
			{ name: 'Python', proficiency: 60 },
			{ name: 'GDScript', proficiency: 35 },
		],
	},
	{
		category: 'Frameworks & Tools',
		skills: [
			{ name: 'Next.js / React', proficiency: 75 },
			{ name: 'Spring Boot', proficiency: 75 },
			{ name: 'Astro', proficiency: 65 },
			{ name: 'Apache Flink & Kafka', proficiency: 55 },
		],
	},
];
