import avatar from "../assets/icon.png";

export interface SocialLink {
	label: string;
	href: string;
	icon: string;
}

export interface OwnerData {
	displayName: string;
	role: string;
	tagline: string;
	mood: string;
	avatarSrc: string;
	avatarAlt: string;
	bio: string[];
	funFacts: string[];
	socialLinks: SocialLink[];
}

export const owner: OwnerData = {
	displayName: 'Cliodhna',
	role: 'SWE',
	tagline: 'Basshunter 4 lyf',
	mood: 'Caffeinated',
	avatarSrc: avatar.src,
	avatarAlt: 'Retro illustrated avatar for Cliodhna',
	bio: [
		'Enjoys all things 2000s',
	],
	funFacts: [
		'🎧 Codes best with one album on repeat',
	],
	socialLinks: [
		{ label: 'GitHub', href: '', icon: '💻' },
		{ label: 'LinkedIn', href: '', icon: '💼' },
	],
};
