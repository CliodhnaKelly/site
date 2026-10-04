// Guestbook entries: validation and (de)serialisation. Storage is injected,
// so tests never touch localStorage. Until a backend lands, signatures live
// only in the visitor's own browser — the UI says so honestly.

export interface Entry {
	name: string;
	message: string;
	at: string; // ISO datetime
	mood: string; // an emoji
}

export const MAX_ENTRIES = 50;
export const NAME_MAX = 30;
export const MESSAGE_MAX = 280;

/** Trim, strip control characters, collapse inner whitespace runs. */
function scrub(s: string): string {
	let out = '';
	for (const ch of s) {
		const code = ch.codePointAt(0) ?? 0;
		out += code < 0x20 || code === 0x7f ? ' ' : ch;
	}
	return out.replace(/\s+/g, ' ').trim();
}

export function validateEntry(
	name: string,
	message: string,
):
	| { ok: true; name: string; message: string }
	| { ok: false; error: string } {
	const n = scrub(name);
	const m = scrub(message);
	if (!n) return { ok: false, error: 'sign a name first!' };
	if (n.length > NAME_MAX) return { ok: false, error: `name is too long (max ${NAME_MAX})` };
	if (!m) return { ok: false, error: 'write a lil message!' };
	if (m.length > MESSAGE_MAX) return { ok: false, error: `message is too long (max ${MESSAGE_MAX})` };
	return { ok: true, name: n, message: m };
}

export function addEntry(entries: Entry[], entry: Entry): Entry[] {
	return [entry, ...entries].slice(0, MAX_ENTRIES);
}

export function loadEntries(raw: string | null): Entry[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((e) => e && typeof e.name === 'string' && typeof e.message === 'string')
			.slice(0, MAX_ENTRIES)
			.map((e) => ({
				name: e.name.slice(0, NAME_MAX),
				message: e.message.slice(0, MESSAGE_MAX),
				at: typeof e.at === 'string' ? e.at : new Date(0).toISOString(),
				mood: typeof e.mood === 'string' ? e.mood.slice(0, 8) : '💬',
			}));
	} catch {
		return [];
	}
}
