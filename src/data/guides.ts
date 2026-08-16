import type { Locale } from "@/i18n/locale";

export type GuideItem = {
	text: string;
	icon?: string;
};

export type GuideNode = {
	id: string;
	title: string;
	icon?: string;
	items?: GuideItem[];
	children?: GuideNode[];
};

export type GuideSection = {
	title: string;
	groups: GuideNode[];
};

const resourcesEn: GuideSection = {
	title: "Resources",
	groups: [
		{
			id: "buy-with",
			title: "What to buy with",
			children: [
				{
					id: "gem",
					title: "Gem",
					icon: "ui_gem.png",
					children: [
						{
							id: "gem-ltp",
							title: "Limited Time Package",
							icon: "ui_side_sale.png",
							items: [
								{
									text: "Rank Packages (available for a limited time when reaching certain ranks)",
									icon: "ui_side_sale.png",
								},
							],
						},
						{
							id: "gem-epic",
							title: "Epic Shop",
							icon: "sub_epic.png",
							items: [
								{ text: "Science + Science Pack I & II", icon: "ui_ep_science_1.png" },
								{ text: "Combat ATK + Combat Pack I & II", icon: "ui_ep_battle_atk_1.png" },
								{ text: "Combat HP + Combat Pack I & II", icon: "ui_ep_battle_hp_1.png" },
								{ text: "Mining Speed", icon: "ui_ep_mining_speed.png" },
								{ text: "Mining Reward Capacity", icon: "ui_ep_mining_time_limit_1.png" },
								{ text: "Forging + Forge Pack I & II", icon: "ui_ep_forge_1.png" },
								{ text: "Rune", icon: "ui_ep_rune.png" },
							],
						},
						{
							id: "gem-challenge",
							title: "Challenge",
							icon: "challenge.png",
							items: [
								{
									text: "Challenge Ticket: Temple of Chaos (daily)",
									icon: "ui_challenge_ticket_chaos.png",
								},
							],
						},
						{
							id: "gem-prism",
							title: "Prism Shop",
							icon: "prismshop.png",
							items: [{ text: "Prism Key (daily)", icon: "ui_prism_key.png" }],
						},
						{
							id: "gem-shop",
							title: "Shop",
							icon: "shop.png",
							items: [{ text: "Cards", icon: "ui_card_ticket_gacha.png" }],
						},
					],
				},
				{
					id: "prism-key-spend",
					title: "Prism Key",
					icon: "ui_prism_key.png",
					children: [
						{
							id: "key-prism",
							title: "Prism Shop",
							icon: "prismshop.png",
							items: [
								{ text: "Spellbook (daily & weekly)", icon: "ui_spell_book.png" },
								{ text: "Gem (daily & weekly)", icon: "ui_gem.png" },
								{
									text: "Challenge Ticket Exchange Coupon (worst cost efficiency, only if buying max temple tickets with gems every day)",
									icon: "ui_challenge_ex_ticket.png",
								},
								{
									text: "Awakening Package (for Chimera Awakening, Enlightenment, and Ascension)",
									icon: "ui_ex_star.png",
								},
							],
						},
					],
				},
				{
					id: "event-15y",
					title: "1.5 Year Anniversary Event Point",
					icon: "ui_event_point_10002.png",
					children: [
						{
							id: "event-15y-shop",
							title: "1.5 Year Anniversary Event Shop",
							icon: "ui_side_event.png",
							items: [
								{ text: "Prism Key x5 & x1", icon: "ui_prism_key.png" },
								{ text: "Spellbook x5000 & x500", icon: "ui_spell_book.png" },
							],
						},
					],
				},
				{
					id: "event-snowy",
					title: "Snowy Night Event Point",
					icon: "ui_event_point_202511.png",
					children: [
						{
							id: "event-snowy-shop",
							title: "Snowy Night Event Shop",
							icon: "ui_side_event.png",
							items: [
								{
									text: "Legendary Card Summon Ticket",
									icon: "ui_card_ticket_legend_gacha.png",
								},
								{ text: "Epic Card Summon Ticket", icon: "ui_card_ticket_epic_gacha.png" },
								{ text: "Prism Key", icon: "ui_prism_key.png" },
								{ text: "Spellbook", icon: "ui_spell_book.png" },
							],
						},
					],
				},
			],
		},
		{
			id: "where-get",
			title: "Where to get",
			children: [
				{
					id: "get-key",
					title: "Prism Key",
					icon: "ui_prism_key.png",
					items: [
						{ text: "Prism Shop", icon: "prismshop.png" },
						{ text: "1.5 Year Anniversary Event Shop", icon: "ui_side_event.png" },
						{ text: "Snowy Night Event Shop", icon: "ui_side_event.png" },
					],
				},
				{
					id: "get-book",
					title: "Spellbook",
					icon: "ui_spell_book.png",
					items: [
						{ text: "Forge", icon: "ui_side_forge.png" },
						{ text: "Prism Shop", icon: "prismshop.png" },
						{ text: "Shop", icon: "shop.png" },
						{ text: "1.5 Year Anniversary Event Shop", icon: "ui_side_event.png" },
						{ text: "Snowy Night Event Shop", icon: "ui_side_event.png" },
					],
				},
				{
					id: "get-mythic",
					title: "Mythic Token",
					icon: "ui_mystic_token.png",
					children: [
						{
							id: "mythic-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Sanctum — Dismantle mythic artifacts",
									icon: "art_sanctum.png",
								},
							],
						},
					],
				},
				{
					id: "get-prism-crystal",
					title: "Prism Crystal",
					icon: "ui_prism_crystal.png",
					children: [
						{
							id: "prism-crystal-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Sanctum — Dismantle non-mythic artifacts",
									icon: "art_sanctum.png",
								},
							],
						},
					],
				},
				{
					id: "get-ether",
					title: "Ether",
					icon: "ui_ether.png",
					children: [
						{
							id: "ether-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Tree of Truth — Produced at noon and midnight based on number of Seed of Enlightenment used in the active preset",
									icon: "art_truthgarden.png",
								},
							],
						},
						{
							id: "ether-boost",
							title: "Boost Item",
							icon: "ui_side_item.png",
							items: [
								{
									text: "Candle (benefits from 1.5 Year Anniversary Event Special Buff Ether Production)",
									icon: "ui_it_candle.png",
								},
							],
						},
					],
				},
				{
					id: "get-crystal-enl",
					title: "Crystal of Enlightenment",
					icon: "ui_truth_crystal.png",
					children: [
						{
							id: "crystal-enl-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Wisdom Fountain — Produced in Meditation with Enlightenment level 1 or higher",
									icon: "art_truthgarden.png",
								},
							],
						},
					],
				},
				{
					id: "get-stone",
					title: "Stone of Truth",
					icon: "ui_truth_stone.png",
					children: [
						{
							id: "stone-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Path of Truth — Produced in Path of Truth with Ascension level 1 or higher",
									icon: "art_truthgarden.png",
								},
							],
						},
					],
				},
			],
		},
		{
			id: "do-with",
			title: "What to do with",
			children: [
				{
					id: "golden-clock",
					title: "Golden Magic Watch",
					icon: "ui_magic_clock_gold.png",
					children: [
						{
							id: "clock-dim",
							title: "Dimension",
							icon: "ui_btm_dimension_on.png",
							items: [
								{ text: "Wheel of Life acceleration", icon: "wheel_of_life.png" },
								{ text: "Oracle — Blessing duration", icon: "ui_blessing.png" },
							],
						},
						{
							id: "clock-exp",
							title: "Expansion fast forward 24h (optional)",
							icon: "ui_magic_clock_gold.png",
							items: [
								{
									text: "Art Society — Confidential Area-0: Expansion (Master 11)",
									icon: "art_secretarea.png",
								},
								{
									text: "Art Society — Garden of Truth: Expansion (God 4)",
									icon: "art_truthgarden.png",
								},
								{
									text: "Dimension — Oracle: Expansion (Super God 4)",
									icon: "dimension_main_oracle_01.png",
								},
							],
						},
					],
				},
				{
					id: "golden-map",
					title: "Golden Map",
					icon: "ui_map_gold.png",
					children: [
						{
							id: "map-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Confidential Area-0 → OMEGA — Chaos Chamber upgrades",
									icon: "art_secretarea.png",
								},
								{
									text: "Confidential Area-0 → Dimensional Exploration — use to finish the last 4% of the dimension",
									icon: "art_secretarea.png",
								},
								{
									text: "Confidential Area-0 → Ruler — Core Upgrade",
									icon: "art_secretarea.png",
								},
							],
						},
					],
				},
			],
		},
	],
};

const resourcesEs: GuideSection = {
	title: "Recursos",
	groups: [
		{
			id: "buy-with",
			title: "En qué gastar",
			children: [
				{
					id: "gem",
					title: "Gema",
					icon: "ui_gem.png",
					children: [
						{
							id: "gem-ltp",
							title: "Paquete de tiempo limitado",
							icon: "ui_side_sale.png",
							items: [
								{
									text: "Paquetes de rango (disponibles un tiempo limitado al alcanzar ciertos rangos)",
									icon: "ui_side_sale.png",
								},
							],
						},
						{
							id: "gem-epic",
							title: "Epic Shop",
							icon: "sub_epic.png",
							items: [
								{ text: "Ciencia + Science Pack I & II", icon: "ui_ep_science_1.png" },
								{ text: "Combat ATK + Combat Pack I & II", icon: "ui_ep_battle_atk_1.png" },
								{ text: "Combat HP + Combat Pack I & II", icon: "ui_ep_battle_hp_1.png" },
								{ text: "Velocidad de minería", icon: "ui_ep_mining_speed.png" },
								{
									text: "Capacidad de recompensa de minería",
									icon: "ui_ep_mining_time_limit_1.png",
								},
								{ text: "Forja + Forge Pack I & II", icon: "ui_ep_forge_1.png" },
								{ text: "Runa", icon: "ui_ep_rune.png" },
							],
						},
						{
							id: "gem-challenge",
							title: "Challenge",
							icon: "challenge.png",
							items: [
								{
									text: "Ticket de Challenge: Temple of Chaos (diario)",
									icon: "ui_challenge_ticket_chaos.png",
								},
							],
						},
						{
							id: "gem-prism",
							title: "Prism Shop",
							icon: "prismshop.png",
							items: [{ text: "Llave Prismática (diaria)", icon: "ui_prism_key.png" }],
						},
						{
							id: "gem-shop",
							title: "Shop",
							icon: "shop.png",
							items: [{ text: "Cartas", icon: "ui_card_ticket_gacha.png" }],
						},
					],
				},
				{
					id: "prism-key-spend",
					title: "Llave Prismática",
					icon: "ui_prism_key.png",
					children: [
						{
							id: "key-prism",
							title: "Prism Shop",
							icon: "prismshop.png",
							items: [
								{ text: "Spellbook (diario y semanal)", icon: "ui_spell_book.png" },
								{ text: "Gema (diaria y semanal)", icon: "ui_gem.png" },
								{
									text: "Cupón de intercambio de tickets de Challenge (peor eficiencia; solo si compras el máximo de tickets del templo con gemas cada día)",
									icon: "ui_challenge_ex_ticket.png",
								},
								{
									text: "Paquete de Awakening (para Chimera Awakening, Iluminación y Ascensión)",
									icon: "ui_ex_star.png",
								},
							],
						},
					],
				},
				{
					id: "event-15y",
					title: "Puntos del evento 1.5 Year Anniversary",
					icon: "ui_event_point_10002.png",
					children: [
						{
							id: "event-15y-shop",
							title: "Tienda del evento 1.5 Year Anniversary",
							icon: "ui_side_event.png",
							items: [
								{ text: "Llave Prismática x5 y x1", icon: "ui_prism_key.png" },
								{ text: "Spellbook x5000 y x500", icon: "ui_spell_book.png" },
							],
						},
					],
				},
				{
					id: "event-snowy",
					title: "Puntos del evento Snowy Night",
					icon: "ui_event_point_202511.png",
					children: [
						{
							id: "event-snowy-shop",
							title: "Tienda del evento Snowy Night",
							icon: "ui_side_event.png",
							items: [
								{
									text: "Ticket de invocación de carta Legendaria",
									icon: "ui_card_ticket_legend_gacha.png",
								},
								{
									text: "Ticket de invocación de carta Épica",
									icon: "ui_card_ticket_epic_gacha.png",
								},
								{ text: "Llave Prismática", icon: "ui_prism_key.png" },
								{ text: "Spellbook", icon: "ui_spell_book.png" },
							],
						},
					],
				},
			],
		},
		{
			id: "where-get",
			title: "Dónde conseguir",
			children: [
				{
					id: "get-key",
					title: "Llave Prismática",
					icon: "ui_prism_key.png",
					items: [
						{ text: "Prism Shop", icon: "prismshop.png" },
						{ text: "Tienda del evento 1.5 Year Anniversary", icon: "ui_side_event.png" },
						{ text: "Tienda del evento Snowy Night", icon: "ui_side_event.png" },
					],
				},
				{
					id: "get-book",
					title: "Spellbook",
					icon: "ui_spell_book.png",
					items: [
						{ text: "Forge", icon: "ui_side_forge.png" },
						{ text: "Prism Shop", icon: "prismshop.png" },
						{ text: "Shop", icon: "shop.png" },
						{ text: "Tienda del evento 1.5 Year Anniversary", icon: "ui_side_event.png" },
						{ text: "Tienda del evento Snowy Night", icon: "ui_side_event.png" },
					],
				},
				{
					id: "get-mythic",
					title: "Mythic Token",
					icon: "ui_mystic_token.png",
					children: [
						{
							id: "mythic-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Sanctum — Desmantelar artefactos míticos",
									icon: "art_sanctum.png",
								},
							],
						},
					],
				},
				{
					id: "get-prism-crystal",
					title: "Cristal Prismático",
					icon: "ui_prism_crystal.png",
					children: [
						{
							id: "prism-crystal-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Sanctum — Desmantelar artefactos no míticos",
									icon: "art_sanctum.png",
								},
							],
						},
					],
				},
				{
					id: "get-ether",
					title: "Éter",
					icon: "ui_ether.png",
					children: [
						{
							id: "ether-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Tree of Truth — Se produce a mediodía y medianoche según las Seed of Enlightenment del preset activo",
									icon: "art_truthgarden.png",
								},
							],
						},
						{
							id: "ether-boost",
							title: "Boost Item",
							icon: "ui_side_item.png",
							items: [
								{
									text: "Candle (se beneficia del Special Buff de producción de Éter del evento 1.5 Year Anniversary)",
									icon: "ui_it_candle.png",
								},
							],
						},
					],
				},
				{
					id: "get-crystal-enl",
					title: "Cristal de Iluminación",
					icon: "ui_truth_crystal.png",
					children: [
						{
							id: "crystal-enl-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Wisdom Fountain — Se produce en Meditation con Iluminación nivel 1 o superior",
									icon: "art_truthgarden.png",
								},
							],
						},
					],
				},
				{
					id: "get-stone",
					title: "Piedra de la Verdad",
					icon: "ui_truth_stone.png",
					children: [
						{
							id: "stone-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Garden of Truth → Path of Truth — Se produce en Path of Truth con Ascensión nivel 1 o superior",
									icon: "art_truthgarden.png",
								},
							],
						},
					],
				},
			],
		},
		{
			id: "do-with",
			title: "Qué hacer con",
			children: [
				{
					id: "golden-clock",
					title: "Reloj Mágico Dorado",
					icon: "ui_magic_clock_gold.png",
					children: [
						{
							id: "clock-dim",
							title: "Dimension",
							icon: "ui_btm_dimension_on.png",
							items: [
								{ text: "Aceleración de Wheel of Life", icon: "wheel_of_life.png" },
								{ text: "Oracle — duración de Blessing", icon: "ui_blessing.png" },
							],
						},
						{
							id: "clock-exp",
							title: "Expansion fast forward 24h (opcional)",
							icon: "ui_magic_clock_gold.png",
							items: [
								{
									text: "Art Society — Confidential Area-0: Expansion (Master 11)",
									icon: "art_secretarea.png",
								},
								{
									text: "Art Society — Garden of Truth: Expansion (God 4)",
									icon: "art_truthgarden.png",
								},
								{
									text: "Dimension — Oracle: Expansion (Super God 4)",
									icon: "dimension_main_oracle_01.png",
								},
							],
						},
					],
				},
				{
					id: "golden-map",
					title: "Mapa Dorado",
					icon: "ui_map_gold.png",
					children: [
						{
							id: "map-art",
							title: "Art Society",
							icon: "sub_artsociety.png",
							items: [
								{
									text: "Confidential Area-0 → OMEGA — mejoras de Chaos Chamber",
									icon: "art_secretarea.png",
								},
								{
									text: "Confidential Area-0 → Dimensional Exploration — para terminar el último 4% de la dimensión",
									icon: "art_secretarea.png",
								},
								{
									text: "Confidential Area-0 → Ruler — Core Upgrade",
									icon: "art_secretarea.png",
								},
							],
						},
					],
				},
			],
		},
	],
};

function unlock(id: string, title: string, icon: string, items: GuideItem[]): GuideNode {
	return { id, title, icon, items };
}

const featuresEn: GuideSection = {
	title: "Rank Unlocks",
	groups: [
		{
			id: "common",
			title: "Common",
			icon: "common.png",
			children: [
				unlock("common4", "Common 4", "common4.png", [
					{ text: "Challenge", icon: "challenge.png" },
					{ text: "Challenge — Wall of Eternity", icon: "challenge.png" },
					{ text: "Mine", icon: "ui_side_mine.png" },
				]),
				unlock("common5", "Common 5", "common5.png", [
					{ text: "Prestige", icon: "ui_btm_altar_on.png" },
					{ text: "Event", icon: "ui_side_event.png" },
				]),
				unlock("common6", "Common 6", "common6.png", [
					{ text: "Challenge — Golden Altar", icon: "challenge.png" },
				]),
				unlock("common7", "Common 7", "common7.png", [
					{ text: "Soul — Soul Enhancement", icon: "sub_soul.png" },
				]),
				unlock("common9", "Common 9", "common9.png", [
					{ text: "System Admin", icon: "altar_system.png" },
				]),
				unlock("common10", "Common 10", "common10.png", [
					{ text: "Science Foundation", icon: "sub_science.png" },
					{ text: "Science Foundation — Innovation Lab", icon: "sub_science.png" },
				]),
				unlock("common12", "Common 12", "common12.png", [
					{ text: "Art Society", icon: "sub_artsociety.png" },
					{ text: "Art Society — Garden of Truth", icon: "art_truthgarden.png" },
				]),
				unlock("common16", "Common 16", "common16.png", [
					{ text: "Science Foundation — Demon Cult", icon: "sci_icon_devil.png" },
				]),
				unlock("common18", "Common 18", "common18.png", [
					{ text: "Science Foundation — Demon Cult → Curse", icon: "sci_icon_devil.png" },
				]),
			],
		},
		{
			id: "pro",
			title: "Pro",
			icon: "pro.png",
			children: [
				unlock("pro1", "Pro 1", "pro1.png", [
					{ text: "Art Society — Sanctum", icon: "art_sanctum.png" },
					{ text: "Challenge — Temple of Chaos", icon: "challenge.png" },
				]),
				unlock("pro3", "Pro 3", "pro3.png", [
					{ text: "Divine Beast — Awakening", icon: "beast.png" },
				]),
				unlock("pro4", "Pro 4", "pro4.png", [{ text: "Forge", icon: "ui_side_forge.png" }]),
				unlock("pro7", "Pro 7", "pro7.png", [
					{ text: "Science Foundation — War AI", icon: "sci_icon_warai.png" },
				]),
				unlock("pro12", "Pro 12", "pro12.png", [
					{ text: "Science Foundation — War AI → Soul Altar", icon: "sci_icon_warai.png" },
				]),
			],
		},
		{
			id: "master",
			title: "Master",
			icon: "master.png",
			children: [
				unlock("master3", "Master 3", "master3.png", [
					{ text: "Divine Beast — Surge", icon: "ui_dv_enhance_surge.png" },
				]),
				unlock("master4", "Master 4", "master4.png", [
					{ text: "Science Foundation — Golden Cube", icon: "sci_icon_goldcube.png" },
				]),
				unlock("master6", "Master 6", "master6.png", [
					{ text: "Art Society — Confidential Area-0", icon: "art_secretarea.png" },
				]),
				unlock("master10", "Master 10", "master10.png", [
					{
						text: "Science Foundation — Golden Cube → Innovation",
						icon: "sci_icon_goldcube.png",
					},
				]),
				unlock("master11", "Master 11", "master11.png", [
					{
						text: "Art Society — Confidential Area-0: Expansion",
						icon: "art_secretarea.png",
					},
				]),
			],
		},
		{
			id: "god",
			title: "God",
			icon: "god.png",
			children: [
				unlock("god1", "God 1", "god1.png", [
					{ text: "Dimension Menu", icon: "ui_btm_dimension_on.png" },
					{ text: "Dimensional Gate", icon: "dim_gate.png" },
					{ text: "Wheel of Life", icon: "wheel_of_life.png" },
				]),
				unlock("god4", "God 4", "god4.png", [
					{ text: "Art Society — Garden of Truth: Expansion", icon: "art_truthgarden.png" },
				]),
				unlock("god7", "God 7", "god7.png", [
					{ text: "Dimension — Oracle", icon: "dimension_main_oracle_01.png" },
				]),
				unlock("god9", "God 9", "god9.png", [
					{ text: "Art Society — Dimensional Archive", icon: "art_dimensional_archive.png" },
				]),
				unlock("god11", "God 11", "god11.png", [{ text: "Dimension — Nexus", icon: "nexus.png" }]),
				unlock("god13", "God 13", "god13.png", [
					{ text: "Dimensional Gate: Expansion", icon: "dim_gate.png" },
					{ text: "Challenge — Dimensional Dive", icon: "dimtech_dive.png" },
				]),
				unlock("god15", "God 15", "god15.png", [
					{ text: "Challenge — Dimensional Dive (Hard)", icon: "dimtech_dive.png" },
				]),
			],
		},
		{
			id: "supergod",
			title: "Super God",
			icon: "supergod.png",
			children: [
				unlock("supergod1", "Super God 1", "supergod1.png", [
					{ text: "Dimension — Nexus", icon: "nexus.png" },
					{ text: "Dimension — Warframe", icon: "warframe_image_01.png" },
					{ text: "Challenge — Lagrange Point", icon: "challenge.png" },
				]),
				unlock("supergod4", "Super God 4", "supergod4.png", [
					{ text: "Dimension — Oracle: Expansion", icon: "dimension_main_oracle_01.png" },
				]),
				unlock("supergod7", "Super God 7", "supergod7.png", [
					{
						text: "Art Society — Dimensional Archive: Expansion",
						icon: "art_dimensional_archive.png",
					},
				]),
			],
		},
	],
};

const featuresEs: GuideSection = {
	title: "Desbloqueos por rango",
	groups: [
		{
			id: "common",
			title: "Common",
			icon: "common.png",
			children: [
				unlock("common4", "Common 4", "common4.png", [
					{ text: "Challenge", icon: "challenge.png" },
					{ text: "Challenge — Wall of Eternity", icon: "challenge.png" },
					{ text: "Mine", icon: "ui_side_mine.png" },
				]),
				unlock("common5", "Common 5", "common5.png", [
					{ text: "Prestigio", icon: "ui_btm_altar_on.png" },
					{ text: "Evento", icon: "ui_side_event.png" },
				]),
				unlock("common6", "Common 6", "common6.png", [
					{ text: "Challenge — Golden Altar", icon: "challenge.png" },
				]),
				unlock("common7", "Common 7", "common7.png", [
					{ text: "Soul — Soul Enhancement", icon: "sub_soul.png" },
				]),
				unlock("common9", "Common 9", "common9.png", [
					{ text: "System Admin", icon: "altar_system.png" },
				]),
				unlock("common10", "Common 10", "common10.png", [
					{ text: "Science Foundation", icon: "sub_science.png" },
					{ text: "Science Foundation — Innovation Lab", icon: "sub_science.png" },
				]),
				unlock("common12", "Common 12", "common12.png", [
					{ text: "Art Society", icon: "sub_artsociety.png" },
					{ text: "Art Society — Garden of Truth", icon: "art_truthgarden.png" },
				]),
				unlock("common16", "Common 16", "common16.png", [
					{ text: "Science Foundation — Demon Cult", icon: "sci_icon_devil.png" },
				]),
				unlock("common18", "Common 18", "common18.png", [
					{ text: "Science Foundation — Demon Cult → Curse", icon: "sci_icon_devil.png" },
				]),
			],
		},
		{
			id: "pro",
			title: "Pro",
			icon: "pro.png",
			children: [
				unlock("pro1", "Pro 1", "pro1.png", [
					{ text: "Art Society — Sanctum", icon: "art_sanctum.png" },
					{ text: "Challenge — Temple of Chaos", icon: "challenge.png" },
				]),
				unlock("pro3", "Pro 3", "pro3.png", [
					{ text: "Divine Beast — Awakening", icon: "beast.png" },
				]),
				unlock("pro4", "Pro 4", "pro4.png", [{ text: "Forge", icon: "ui_side_forge.png" }]),
				unlock("pro7", "Pro 7", "pro7.png", [
					{ text: "Science Foundation — War AI", icon: "sci_icon_warai.png" },
				]),
				unlock("pro12", "Pro 12", "pro12.png", [
					{ text: "Science Foundation — War AI → Soul Altar", icon: "sci_icon_warai.png" },
				]),
			],
		},
		{
			id: "master",
			title: "Master",
			icon: "master.png",
			children: [
				unlock("master3", "Master 3", "master3.png", [
					{ text: "Divine Beast — Surge", icon: "ui_dv_enhance_surge.png" },
				]),
				unlock("master4", "Master 4", "master4.png", [
					{ text: "Science Foundation — Golden Cube", icon: "sci_icon_goldcube.png" },
				]),
				unlock("master6", "Master 6", "master6.png", [
					{ text: "Art Society — Confidential Area-0", icon: "art_secretarea.png" },
				]),
				unlock("master10", "Master 10", "master10.png", [
					{
						text: "Science Foundation — Golden Cube → Innovation",
						icon: "sci_icon_goldcube.png",
					},
				]),
				unlock("master11", "Master 11", "master11.png", [
					{
						text: "Art Society — Confidential Area-0: Expansion",
						icon: "art_secretarea.png",
					},
				]),
			],
		},
		{
			id: "god",
			title: "God",
			icon: "god.png",
			children: [
				unlock("god1", "God 1", "god1.png", [
					{ text: "Menú Dimension", icon: "ui_btm_dimension_on.png" },
					{ text: "Dimensional Gate", icon: "dim_gate.png" },
					{ text: "Wheel of Life", icon: "wheel_of_life.png" },
				]),
				unlock("god4", "God 4", "god4.png", [
					{ text: "Art Society — Garden of Truth: Expansion", icon: "art_truthgarden.png" },
				]),
				unlock("god7", "God 7", "god7.png", [
					{ text: "Dimension — Oracle", icon: "dimension_main_oracle_01.png" },
				]),
				unlock("god9", "God 9", "god9.png", [
					{ text: "Art Society — Dimensional Archive", icon: "art_dimensional_archive.png" },
				]),
				unlock("god11", "God 11", "god11.png", [{ text: "Dimension — Nexus", icon: "nexus.png" }]),
				unlock("god13", "God 13", "god13.png", [
					{ text: "Dimensional Gate: Expansion", icon: "dim_gate.png" },
					{ text: "Challenge — Dimensional Dive", icon: "dimtech_dive.png" },
				]),
				unlock("god15", "God 15", "god15.png", [
					{ text: "Challenge — Dimensional Dive (Hard)", icon: "dimtech_dive.png" },
				]),
			],
		},
		{
			id: "supergod",
			title: "Super God",
			icon: "supergod.png",
			children: [
				unlock("supergod1", "Super God 1", "supergod1.png", [
					{ text: "Dimension — Nexus", icon: "nexus.png" },
					{ text: "Dimension — Warframe", icon: "warframe_image_01.png" },
					{ text: "Challenge — Lagrange Point", icon: "challenge.png" },
				]),
				unlock("supergod4", "Super God 4", "supergod4.png", [
					{ text: "Dimension — Oracle: Expansion", icon: "dimension_main_oracle_01.png" },
				]),
				unlock("supergod7", "Super God 7", "supergod7.png", [
					{
						text: "Art Society — Dimensional Archive: Expansion",
						icon: "art_dimensional_archive.png",
					},
				]),
			],
		},
	],
};

export function getResources(locale: Locale): GuideSection {
	return locale === "en" ? resourcesEn : resourcesEs;
}

export function getFeatures(locale: Locale): GuideSection {
	return locale === "en" ? featuresEn : featuresEs;
}
