import type { Locale } from "@/i18n/locale";

export type AppMeta = {
	todo: string[];
	versions: { date: string; game: string; notes: string[] }[];
	credits: string[];
};

const es: AppMeta = {
	todo: [
		"Pestaña Forge",
		"Mileage en conversiones de recursos",
		"Forge en conversiones (quizá)",
		"Ordenar o filtrar (prioridad baja)",
		"Navegación más fácil (prioridad baja)",
		"Explicación de cada pestaña",
		"Explicar investigación War AI etc.",
		"Intercambiabilidad Prism Key / gemas",
		"Conversor de notación",
		"Guía Oracle / Nexus / Ragnarok",
		"Lista de mejoras Science y Quantum",
		"Prism Card",
		"Qué hace el fuel (96k + 1440 mínimo)",
		"Progresión de artefactos",
	],
	versions: [
		{
			date: "12/04/2025",
			game: "v2.3.9",
			notes: [
				"Refleja cambios de v2.3.9",
				"Añadido al walkthrough",
				"Enlace al blog de Seasoning Games",
				"Botón Export en la herramienta de Presets",
				"Calculadora de Quantum Points por separado",
			],
		},
		{
			date: "11/24/2025",
			game: "v2.3.4",
			notes: ["Añadida herramienta de Presets"],
		},
		{
			date: "11/15/2025",
			game: "v2.3.4",
			notes: ["Lanzamiento inicial"],
		},
	],
	credits: [
		"Deathfisaro — herramientas originales",
		"Glare — JSON del tablero Tree of Truth",
		"Seasoning Games — Brick Inc / Idle Breaker",
	],
};

const en: AppMeta = {
	todo: [
		"Forge tab?",
		"Mileage in resource conversion",
		"Forge in resource conversion (maybe)",
		"Sort or filter (low priority)",
		"Easier navigation (low priority)",
		"Explanation of each tab",
		"Explain research tab of war ai and stuff",
		"Prism key interchangeability with gems",
		"Notation converter",
		"Oracle Nexus Ragnarok guide",
		"Science and quantum upgrade list",
		"Prism Card",
		"What does fuel do 96k + 1440 minimum",
		"Artifact progression",
	],
	versions: [
		{
			date: "12/04/2025",
			game: "v2.3.9",
			notes: [
				"Reflect changes in v2.3.9",
				"Added to walkthrough",
				"Added Seasoning Games blog link",
				"Added Preset tool export button",
				"Added Quantum Point calculator separately",
			],
		},
		{
			date: "11/24/2025",
			game: "v2.3.4",
			notes: ["Added Preset tool"],
		},
		{
			date: "11/15/2025",
			game: "v2.3.4",
			notes: ["Initial release"],
		},
	],
	credits: [
		"Deathfisaro — original tools",
		"Glare — for providing tree of truth board JSON",
		"Seasoning Games — Brick Inc / Idle Breaker",
	],
};

export function getAppMeta(locale: Locale): AppMeta {
	return locale === "en" ? en : es;
}
