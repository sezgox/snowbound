export type TribeBackground =
	| { kind: "gradient"; css: string }
	| { kind: "solid"; hex: string };

export type TribeVisual = {
	id: string;
	character: string;
	background: TribeBackground;
};

export const tribeVisuals: TribeVisual[] = [
	{
		id: "iqurnat",
		character: "/images/figma/tribes/character-1.webp",
		background: {
			kind: "gradient",
			css: "linear-gradient(113.3deg, rgb(225, 134, 225) 0%, rgb(194, 100, 194) 99.39%)",
		},
	},
	{
		id: "qaniktuq",
		character: "/images/figma/tribes/character-2.webp",
		background: { kind: "solid", hex: "#9e5248" },
	},
	{
		id: "kaviktaq",
		character: "/images/figma/tribes/character-3.webp",
		background: { kind: "solid", hex: "#d3c94a" },
	},
	{
		id: "amarok",
		character: "/images/figma/tribes/character-4.webp",
		background: { kind: "solid", hex: "#fda443" },
	},
	{
		id: "sednaluk",
		character: "/images/figma/tribes/character-5.webp",
		background: { kind: "solid", hex: "#bde2db" },
	},
	{
		id: "nunaqar",
		character: "/images/figma/tribes/character-6.webp",
		background: { kind: "solid", hex: "#b2eea7" },
	},
];
