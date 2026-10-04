import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { bookmarks } from '../data/bookmarks';
import { owner } from '../data/owner';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { themes } from '../data/themes';

// These tests describe what the site needs to render correctly,
// so a data edit that would break a page fails the build.

describe('owner', () => {
	it('has the fields the sidebar and hero render', () => {
		expect(owner.displayName).toBeTruthy();
		expect(owner.tagline).toBeTruthy();
		expect(owner.mood).toBeTruthy();
		// avatarSrc is an Astro image import; under plain Vitest it resolves
		// differently than in Astro, so only the alt text is asserted here.
		expect(owner.avatarAlt).toBeTruthy();
		expect(owner.bio.length).toBeGreaterThanOrEqual(1);
		expect(owner.funFacts.length).toBeGreaterThanOrEqual(1);
	});

	it('social links all point somewhere', () => {
		expect(owner.socialLinks.length).toBeGreaterThanOrEqual(1);
		for (const link of owner.socialLinks) {
			expect(link.label).toBeTruthy();
			expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
		}
	});
});

describe('projects', () => {
	it('every project renders a complete card', () => {
		for (const project of projects) {
			expect(project.title).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(project.repoUrl).toMatch(/^https:\/\//);
			expect(project.techStack.length).toBeGreaterThanOrEqual(1);
			if (project.demoUrl) expect(project.demoUrl).toMatch(/^https:\/\//);
		}
	});

	it('orders are unique so the Top 16 sort is stable', () => {
		const orders = projects.map((p) => p.order);
		expect(new Set(orders).size).toBe(orders.length);
	});
});

describe('skills', () => {
	it('every skill fits the 0–100 progress meter', () => {
		expect(skillCategories.length).toBeGreaterThanOrEqual(1);
		for (const category of skillCategories) {
			expect(category.category).toBeTruthy();
			expect(category.skills.length).toBeGreaterThanOrEqual(1);
			for (const skill of category.skills) {
				expect(skill.name).toBeTruthy();
				expect(skill.proficiency).toBeGreaterThanOrEqual(0);
				expect(skill.proficiency).toBeLessThanOrEqual(100);
			}
		}
	});
});

describe('bookmarks', () => {
	it('every bookmark is a complete https link', () => {
		expect(bookmarks.length).toBeGreaterThanOrEqual(1);
		for (const bookmark of bookmarks) {
			expect(bookmark.title).toBeTruthy();
			expect(bookmark.url).toMatch(/^https:\/\//);
		}
	});
});

describe('themes', () => {
	const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf-8');

	it('every non-default skin has a [data-theme] block in global.css', () => {
		for (const theme of themes.filter((t) => t.id !== 'pink')) {
			expect(css, `missing [data-theme="${theme.id}"] block`).toContain(`[data-theme="${theme.id}"]`);
		}
	});

	it('pink is the default skin', () => {
		expect(themes[0]?.id).toBe('pink');
	});
});
