export interface SkillCategory {
	category: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		category: 'Languages',
		skills: [
			'TypeScript',
			'Java',
			'SQL',
			'Python',
		],
	},
	{
		category: 'Frameworks & Tools',
		skills: [
			'Next.js / React',
			'Spring Boot',
			'Apache Flink & Kafka',
		],
	},
];
