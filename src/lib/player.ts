// Winamp-brain: track sequencing and time formatting. Pure.

export interface Track {
	title: string;
	artist: string;
	src: string; // path under /audio/, or a blob: URL for visitor-loaded files
}

export function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
	const s = Math.floor(seconds);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function nextIndex(current: number, length: number, repeatOne: boolean): number | null {
	if (length === 0) return null;
	if (repeatOne) return current;
	return current + 1 < length ? current + 1 : 0;
}

export function prevIndex(current: number, length: number): number | null {
	if (length === 0) return null;
	return current > 0 ? current - 1 : length - 1;
}

/** The scrolling marquee text, MAJOR LABEL STYLE. */
export function marqueeText(track: Track | undefined): string {
	if (!track) return '*** winamp-ish · load a track ***';
	return `*** ${track.artist} – ${track.title} ***`.toUpperCase();
}
