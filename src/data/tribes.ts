export type TribeBackground =
	| { kind: "gradient"; css: string }
	| { kind: "solid"; hex: string };

export type TribeSlide = {
	name: string;
	lines: string[];
	character: string;
	background: TribeBackground;
};

export const tribeSlides: TribeSlide[] = [
	{
		name: "IQURNAT",
		lines: [
			"Shamans who invoke the power of the Thal tree.",
			"They are known for being in harmony with the spirits of the beyond.",
		],
		character: "/images/figma/tribes/character-1.webp",
		background: {
			kind: "gradient",
			css: "linear-gradient(113.3deg, rgb(225, 134, 225) 0%, rgb(194, 100, 194) 99.39%)",
		},
	},
	{
		name: "Qaniktuq",
		lines: [
			"Tribe known for having their hair covered in ice.",
			"Their specialty is controlling polar bears.",
		],
		character: "/images/figma/tribes/character-2.webp",
		background: { kind: "solid", hex: "#9e5248" },
	},
	{
		name: "Kaviktaq",
		lines: [
			"Tribe known for being nomadic and undertaking long journeys in search of food.",
			"They stand out for their skill in handling kayaks and their understanding of the environment.",
		],
		character: "/images/figma/tribes/character-3.webp",
		background: { kind: "solid", hex: "#d3c94a" },
	},
	{
		name: "IQURNAT",
		lines: [
			"Shamans who invoke the power of the Thal tree.",
			"They are known for being in harmony with spirits from the beyond.",
		],
		character: "/images/figma/tribes/character-4.webp",
		background: { kind: "solid", hex: "#fda443" },
	},
	{
		name: "Sednaluk",
		lines: [
			'They are given the name "Singers of the Sea" as they worship the goddess Sedna.',
			"Their culture is based on the sea and traditions.",
		],
		character: "/images/figma/tribes/character-5.webp",
		background: { kind: "solid", hex: "#bde2db" },
	},
	{
		name: "Nunaqar",
		lines: [
			"Tribe known for being experts in the manufacture of snow goggles, a resource that allows them to travel during snowstorms.",
			"Their specialty is traditional craftsmanship.",
		],
		character: "/images/figma/tribes/character-6.webp",
		background: { kind: "solid", hex: "#b2eea7" },
	},
];
