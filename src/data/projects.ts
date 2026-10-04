export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	repoUrl: string;
	demoUrl?: string;
	order: number;
}

// Empty until the projects are ready to show; TopFriendsPanel renders a
// "coming soon" card in the meantime.
export const projects: Project[] = [];
