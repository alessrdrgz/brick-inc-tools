import type { Step } from "@/data/types";

export const steps: Step[] = [
	{
		id: "mechanics",
		n: "01",
		title: "Mechanics Not Explained In The Game",
		summary: "Damage also increases Power — upgrade it even when bricks fall easily.",
		blocks: [
			{
				kind: "text",
				text: "Damage also increases Power. So even if you have no issues breaking bricks, cost efficiently improve Damage to improve Power gain.",
			},
			{
				kind: "callout",
				tag: "KEY_01",
				text: "Damage ↑ means Power ↑, even if you already break everything effortlessly.",
			},
			{
				kind: "callout",
				tag: "KEY_02",
				text: "Prioritize upgrades by cost efficiency, not by the biggest number.",
			},
		],
	},
	{
		id: "prestige",
		n: "02",
		title: "When To Prestige",
		summary: "Let Prestige timing revolve around Soul Altar upgrades.",
		blocks: [
			{
				kind: "text",
				text: "Try to let Prestige timing revolve around Soul Altar upgrades. You can get multiple Soul Altar upgrades per Prestige early on, but later it slows down to multiple Prestiges for one Soul Altar upgrade.",
			},
			{
				kind: "callout",
				tag: "TIP",
				text: "Soul Altar upgrades are ordered from highest level to lowest level, so scroll to the bottom.",
			},
		],
	},
	{
		id: "presets",
		n: "03",
		title: "Learn Presets",
		summary: "5 free presets to switch. Use them instead of resetting (costs gems).",
		blocks: [
			{
				kind: "text",
				text: "You get 5 presets that are free to switch. Utilize presets instead of resetting/deactivating which cost gems.",
			},
			{
				kind: "presets",
				items: [
					{
						code: "P_01",
						name: "Main (econ)",
						use: "Your default preset — use it over 99% of the time.",
						stats: ["Science", "Gold", "Damage", "Power", "Soul", "Dimensional Energy Production"],
					},
					{
						code: "P_02",
						name: "Buy",
						use: "Temporary: buy research, weapons, weapon and soul enhancements.",
						stats: [
							"Research Cost ↓",
							"Weapons Purchase and Enhancement Cost ↓",
							"All Weapons Max Enhancement Level",
							"Soul Enhancement max Lv.",
						],
					},
					{
						code: "P_03",
						name: "Push",
						use: "Temporary: break highest-level bricks or kill divine beasts.",
						stats: [
							"All Weapon Damage",
							"Weapons Enhancement Effect",
							"Crit Damage",
							"Super Crit Damage",
							"All Brick Durability ↓",
							"Divine Beast HP ↓",
						],
					},
					{
						code: "P_04",
						name: "Rank Up",
						use: "Temporary: rank up earlier.",
						stats: ["Power Needed to Rank Up ↓"],
					},
					{
						code: "P_05",
						name: "Combat",
						use: "Temporary: Temple of Chaos and Lagrange Point.",
						stats: ["Combat ATK", "Combat HP", "Temple Of Chaos Additional Item Drop"],
					},
					{
						code: "P_06",
						name: "Mine",
						use: "Temporary: use magic clocks on the mine.",
						stats: [
							"Mining Speed",
							"Max Time for Mining Rewards",
							"Gold",
							"Damage",
							"Power",
							"Rune Discovery Rate",
						],
					},
				],
			},
			{
				kind: "text",
				text: "As you progress and get more Seed of Enlightenment you can merge presets and make room for more specialized ones such as Mine, Forge and Ether.",
			},
		],
	},
	{
		id: "golden-cube",
		n: "04",
		title: "Golden Cube Is Not Bugged",
		summary: "Lowercase b is not billion — it is quintillion.",
		blocks: [
			{
				kind: "text",
				text: "Golden cube costs 4.82b Science to rank up. You invest trillions but it doesn't rank up. The catch is lowercase b is not billion but quintillion.",
			},
			{
				kind: "list",
				title: "Unit scale",
				items: [
					"K (thousand) → M (million) → uppercase B (billion) → T (trillion)",
					"a (quadrillion) → lowercase b (quintillion) → c → d → … → z",
					"aa → ab → … → az → ba → …",
				],
			},
		],
	},
	{
		id: "science-combat",
		n: "05",
		title: "Science & Combat",
		summary: "The two growth pillars for a large portion of the game.",
		blocks: [
			{
				kind: "text",
				text: "Science and Combat are two pillars of growth for a significant portion of the game. Get their Epic Shop upgrades and build presets around them: Main (econ) for Science and Combat for Combat.",
			},
			{
				kind: "list",
				title: "1. Use the Science / Quantum Points tool",
				items: ["Learn when to rank up, when to take the +5% upgrade, and when to spend."],
			},
			{
				kind: "list",
				title: "2. Chimera",
				items: [
					"Divine Beast Chimera is on floor 66.",
					"Get it to level 5, then Exceed 5 times.",
					"Power spike across almost every stat.",
					"Later, with a lot of Ether, Surge 5 times.",
				],
			},
			{
				kind: "list",
				title: "3. All 9 artifacts Legendary or higher",
				items: [
					"Artifacts give Science from Legendary rarity — keep combining until all 9 slots are Legendary.",
					"When combining to Legendary+, keep all 9 slots filled with Legendary or higher.",
					"Legendary+, ++, Mythic… give no extra bonus vs Legendary.",
					"Transcendent Orb does not give extra Science at Legendary — chase total bonus, not rarity.",
				],
			},
		],
	},
	{
		id: "god-rank",
		n: "06",
		title: "God Rank, Dimensional Energy, and Presets",
		summary: "God Rank unlocks Dimension Menu and Wheel of Life.",
		blocks: [
			{
				kind: "text",
				text: "Once you hit God Rank, you unlock Dimension Menu and Wheel of Life. You need 1ca (1e+249) Power to start producing Dimensional Energy.",
			},
			{
				kind: "list",
				title: "Early Main (econ) preset",
				items: [
					"Take all the 1s, then 2s, then 3s, and so on.",
					"The empty space between 5 and 6 depends on your Eternal Cube.",
				],
			},
			{
				kind: "list",
				title: "Main (econ) after God 13",
				items: [
					"Below dimension rank 100: copy inner nodes and add 4 Dimensional Energy nodes.",
					"Then take any outer nodes for dimensional milestones.",
					"Outer nodes only work in Dimensional Dive — in the main preset only the milestone matters.",
				],
			},
			{
				kind: "list",
				title: "Dive preset",
				items: [
					"Copy inner nodes and add outer nodes in this order:",
					"Science → Dimensional Energy → Rank Bonus → Gold → Power → Soul → Damage → …",
				],
			},
		],
	},
	{
		id: "enlightenment",
		n: "07",
		title: "Enlightenment",
		summary: "Need Enlightenment level 1+ for Crystal of Enlightenment.",
		blocks: [
			{
				kind: "text",
				text: "In order to gain Crystal of Enlightenment, you need Enlightenment at level 1 or higher.",
			},
			{
				kind: "callout",
				tag: "PATH",
				text: "Art Society → Garden of Truth → Wisdom Fountain → Enlightenment",
			},
		],
	},
	{
		id: "ascension",
		n: "08",
		title: "Ascension",
		summary: "Need Ascension level 1+ for Stone of Truth.",
		blocks: [
			{
				kind: "text",
				text: "In order to gain Stone of Truth, you need Ascension at level 1 or higher.",
			},
			{
				kind: "callout",
				tag: "PATH",
				text: "Art Society → Garden of Truth → Path of Truth → Ascension",
			},
			{
				kind: "list",
				title: "Recommended Truth upgrade order",
				items: [
					"光 Light — 1 point to remove Common grade from Meditation.",
					"暗 Darkness — 1 point to remove Common grade from Path of Truth.",
					"金 Metal — Science and Quantum Points.",
					"風 Wind — Mining Speed and Forging Speed.",
				],
			},
			{
				kind: "list",
				title: "Also consider",
				items: [
					"生 Life — raise max Ether for Meditation (better rarity → more Crystal of Enlightenment).",
					"死 Death — raise max Crystal of Enlightenment for Path of Truth (better rarity → more Stone of Truth).",
				],
			},
		],
	},
	{
		id: "tldr",
		n: "09",
		title: "tl;dr",
		summary: "The full route in one line.",
		blocks: [
			{
				kind: "chips",
				title: "Progression route",
				chips: [
					"Presets",
					"Chimera 5+",
					"Enlightenment",
					"Ascension",
					"Enl. 3 / Asc. 2",
					"6/4",
					"6/6",
					"8/7",
				],
			},
			{
				kind: "callout",
				tag: "NOTE",
				text: "Chimera 5 and Griffin 5 along the way.",
			},
		],
	},
];
