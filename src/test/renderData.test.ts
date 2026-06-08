import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { bookmarks } from '../data/bookmarks';
import { owner } from '../data/owner';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';

describe('retro portfolio static data', () => {
	it('Feature: retro-portfolio, Property 2: owner sidebar data is complete', () => {
		expect(owner.displayName).toBeTruthy();
		expect(owner.tagline).toBeTruthy();
		expect(owner.mood).toBeTruthy();
		expect(owner.avatarAlt).toBeTruthy();
		expect(owner.socialLinks).toHaveLength(3);
	});

	it('Feature: retro-portfolio, Property 3: bio and fun facts satisfy profile requirements', () => {
		expect(owner.bio.length).toBeGreaterThanOrEqual(2);
		expect(owner.funFacts.length).toBeGreaterThanOrEqual(5);
	});

	it('Feature: retro-portfolio, Property 4: skills stay inside progress range', () => {
		fc.assert(
			fc.property(fc.constantFrom(...skillCategories), (category) => {
				expect(category.skills.length).toBeGreaterThanOrEqual(3);
				for (const skill of category.skills) {
					expect(skill.proficiency).toBeGreaterThanOrEqual(0);
					expect(skill.proficiency).toBeLessThanOrEqual(100);
				}
			}),
		);
	});

	it('Feature: retro-portfolio, Property 5: expert threshold has representative data', () => {
		const proficiencies = skillCategories.flatMap((category) =>
			category.skills.map((skill) => skill.proficiency),
		);

		expect(proficiencies.filter((value) => value >= 80).length).toBeGreaterThanOrEqual(2);
		expect(proficiencies.some((value) => value < 80)).toBe(true);
	});

	it('Feature: retro-portfolio, Property 7: empty projects array yields placeholder path', () => {
		expect(projects).toHaveLength(0);
	});

	it('Feature: retro-portfolio, Property 8 and 9: bookmarks are complete safe links', () => {
		expect(bookmarks.length).toBeGreaterThanOrEqual(4);
		for (const bookmark of bookmarks) {
			expect(bookmark.title).toBeTruthy();
			expect(bookmark.url).toMatch(/^https:\/\//);
			expect(bookmark.source).toBeTruthy();
			expect(bookmark.dateString).toBeTruthy();
		}
	});
});
