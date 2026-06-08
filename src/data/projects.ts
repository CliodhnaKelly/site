export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	repoUrl: string;
	demoUrl?: string;
	order: number;
}

export const projects: Project[] = [];
