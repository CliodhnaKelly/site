// The pixel pet's brain. Pure and tested; the component just renders it.

export interface PetState {
	happiness: number;
	visited: string[]; // page paths that have fed the pet
	lastSeen: string; // ISO date of the last visit
	pets: number; // times petted today
	petsDate: string; // day the pets counter belongs to
}

export const FRESH_PET: PetState = {
	happiness: 2,
	visited: [],
	lastSeen: '',
	pets: 0,
	petsDate: '',
};

export const MAX_HAPPINESS = 12;
export const DAILY_PET_LIMIT = 5;

export type Mood = 'sleepy' | 'content' | 'happy' | 'sparkly';

export function moodFor(happiness: number): Mood {
	if (happiness <= 2) return 'sleepy';
	if (happiness <= 5) return 'content';
	if (happiness <= 9) return 'happy';
	return 'sparkly';
}

// The dragon has an attitude. The wings flapping at high happiness
// betray that it secretly likes you; it will never admit this.
export const MOOD_LINES: Record<Mood, string> = {
	sleepy: 'ugh. you again? …zzz',
	content: 'i suppose you can stay.',
	happy: 'this changes NOTHING between us.',
	sparkly: '🔥 fine. you’re tolerable. 🔥',
};

const clamp = (n: number) => Math.max(0, Math.min(MAX_HAPPINESS, n));

/** A new page visited feeds the pet once per path. */
export function visitPage(state: PetState, path: string, today: string): PetState {
	const missedDays = daysBetween(state.lastSeen, today);
	// Absence makes the cat sleepy: -1 happiness per full day away beyond the first.
	const decayed = clamp(state.happiness - Math.max(0, missedDays - 1));
	const isNew = !state.visited.includes(path);
	return {
		...state,
		happiness: clamp(decayed + (isNew ? 1 : 0)),
		visited: isNew ? [...state.visited, path] : state.visited,
		lastSeen: today,
	};
}

/** Clicking the pet. Rate-limited so mashing doesn't max it out. */
export function pet(state: PetState, today: string): PetState {
	const pets = state.petsDate === today ? state.pets : 0;
	if (pets >= DAILY_PET_LIMIT) return { ...state, pets, petsDate: today };
	return {
		...state,
		happiness: clamp(state.happiness + 1),
		pets: pets + 1,
		petsDate: today,
	};
}

export function daysBetween(fromISO: string, toISO: string): number {
	if (!fromISO || !toISO) return 0;
	const ms = new Date(toISO).getTime() - new Date(fromISO).getTime();
	return Math.max(0, Math.round(ms / 86_400_000));
}

/** Storage round-trip that never throws and never trusts what it reads. */
export function loadPet(raw: string | null): PetState {
	if (!raw) return { ...FRESH_PET };
	try {
		const parsed = JSON.parse(raw);
		return {
			happiness: clamp(Number(parsed.happiness) || 0),
			visited: Array.isArray(parsed.visited)
				? parsed.visited.filter((v: unknown) => typeof v === 'string').slice(0, 50)
				: [],
			lastSeen: typeof parsed.lastSeen === 'string' ? parsed.lastSeen : '',
			pets: Number.isInteger(parsed.pets) ? parsed.pets : 0,
			petsDate: typeof parsed.petsDate === 'string' ? parsed.petsDate : '',
		};
	} catch {
		return { ...FRESH_PET };
	}
}
