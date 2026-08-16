export type Chip = { label: string };

export type Block =
	| { kind: "text"; text: string }
	| { kind: "callout"; tag: string; text: string }
	| { kind: "list"; title?: string; items: string[] }
	| { kind: "chips"; title: string; chips: string[] }
	| {
			kind: "presets";
			items: { code: string; name: string; use: string; stats: string[] }[];
	  };

export type Step = {
	id: string;
	n: string;
	title: string;
	summary: string;
	blocks: Block[];
};

export const unitScale = [
	{ unit: "K", value: "10^3" },
	{ unit: "M", value: "10^6" },
	{ unit: "B", value: "10^9" },
	{ unit: "T", value: "10^12" },
	{ unit: "a", value: "10^15" },
	{ unit: "b", value: "10^18" },
	{ unit: "c", value: "10^21" },
] as const;

export const stepIds = [
	"mechanics",
	"prestige",
	"presets",
	"golden-cube",
	"science-combat",
	"god-rank",
	"enlightenment",
	"ascension",
	"tldr",
] as const;

export type StepId = (typeof stepIds)[number];
