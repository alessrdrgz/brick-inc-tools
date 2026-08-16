import type { Step } from "@/data/types";

export const steps: Step[] = [
	{
		id: "mechanics",
		n: "01",
		title: "Mecánicas que el juego no explica",
		summary: "El daño también sube tu Poder: mejorarlo siempre merece la pena.",
		blocks: [
			{
				kind: "text",
				text: "El Daño también incrementa el Poder. Así que aunque no tengas problemas para romper ladrillos, sigue mejorando el Daño de forma eficiente en coste para aumentar la ganancia de Poder.",
			},
			{
				kind: "callout",
				tag: "CLAVE_01",
				text: "Daño ↑ implica Poder ↑, incluso si ya rompes todo sin esfuerzo.",
			},
			{
				kind: "callout",
				tag: "CLAVE_02",
				text: "Prioriza mejoras por coste/beneficio, no por número más alto.",
			},
		],
	},
	{
		id: "prestige",
		n: "02",
		title: "Cuándo hacer Prestigio",
		summary: "Haz que el Prestigio gire alrededor de las mejoras del Altar de Almas.",
		blocks: [
			{
				kind: "text",
				text: "Intenta que el momento del Prestigio gire en torno a las mejoras del Altar de Almas. Al principio conseguirás varias mejoras por Prestigio; más adelante se ralentiza y necesitarás varios Prestigios para una sola mejora.",
			},
			{
				kind: "callout",
				tag: "TRUCO",
				text: "Las mejoras del Altar de Almas se ordenan de mayor a menor nivel: baja hasta el final de la lista.",
			},
		],
	},
	{
		id: "presets",
		n: "03",
		title: "Aprende los Presets",
		summary: "5 presets gratuitos para cambiar. Úsalos en vez de resetear (cuesta gemas).",
		blocks: [
			{
				kind: "text",
				text: "Tienes 5 presets que puedes intercambiar gratis. Úsalos en lugar de resetear o desactivar mejoras, que cuesta gemas.",
			},
			{
				kind: "presets",
				items: [
					{
						code: "P_01",
						name: "Main (econ)",
						use: "Tu preset por defecto, en uso más del 99% del tiempo.",
						stats: ["Ciencia", "Oro", "Daño", "Poder", "Alma", "Producción de Energía Dimensional"],
					},
					{
						code: "P_02",
						name: "Buy",
						use: "Temporal: comprar investigación, armas, mejoras de armas y de alma.",
						stats: [
							"Coste de investigación ↓",
							"Coste de armas y mejora ↓",
							"Nivel máx. de mejora de armas",
							"Nivel máx. de mejora de alma",
						],
					},
					{
						code: "P_03",
						name: "Push",
						use: "Temporal: romper ladrillos del nivel más alto o matar bestias divinas.",
						stats: [
							"Daño de todas las armas",
							"Efecto de mejora de armas",
							"Daño crítico",
							"Súper daño crítico",
							"Durabilidad de ladrillos ↓",
							"HP de Bestia Divina ↓",
						],
					},
					{
						code: "P_04",
						name: "Rank Up",
						use: "Temporal: subir de rango antes.",
						stats: ["Poder necesario para subir de rango ↓"],
					},
					{
						code: "P_05",
						name: "Combat",
						use: "Temporal: Templo del Caos y Punto de Lagrange.",
						stats: ["ATK de combate", "HP de combate", "Objetos extra del Templo del Caos"],
					},
					{
						code: "P_06",
						name: "Mine",
						use: "Temporal: usar relojes mágicos en la mina.",
						stats: [
							"Velocidad de minado",
							"Tiempo máx. de recompensas",
							"Oro",
							"Daño",
							"Poder",
							"Descubrimiento de runas",
						],
					},
				],
			},
			{
				kind: "text",
				text: "A medida que avanzas y consigues más Semillas de Iluminación puedes fusionar presets y hacer hueco para otros más especializados como Mina, Forja o Éter.",
			},
		],
	},
	{
		id: "golden-cube",
		n: "04",
		title: "El Cubo Dorado no está roto",
		summary: "La b minúscula no es billón: es quintillón.",
		blocks: [
			{
				kind: "text",
				text: "El Cubo Dorado cuesta 4,82b de Ciencia para subir de rango. Inviertes billones y no sube. El truco es que la b minúscula no significa billion, sino quintillón.",
			},
			{
				kind: "list",
				title: "Escala de unidades",
				items: [
					"K (mil) → M (millón) → B mayúscula (billion) → T (trillion)",
					"a (quadrillion) → b minúscula (quintillion) → c → d → … → z",
					"aa → ab → … → az → ba → …",
				],
			},
		],
	},
	{
		id: "science-combat",
		n: "05",
		title: "Ciencia y Combate",
		summary: "Los dos pilares de crecimiento durante gran parte del juego.",
		blocks: [
			{
				kind: "text",
				text: "Ciencia y Combate son los dos pilares de crecimiento durante una parte muy importante del juego. Consigue sus mejoras en la Tienda Épica y construye presets alrededor: Main (econ) para Ciencia y Combat para Combate.",
			},
			{
				kind: "list",
				title: "1. Usa la herramienta de Ciencia / Puntos Cuánticos",
				items: ["Aprende cuándo subir de rango, cuándo coger la mejora +5% y cuándo gastar."],
			},
			{
				kind: "list",
				title: "2. Quimera",
				items: [
					"La Bestia Divina Quimera está en el piso 66.",
					"Súbela a nivel 5 y luego supérala 5 veces (Exceed ×5).",
					"Es un salto de potencia en prácticamente todas las estadísticas.",
					"Más adelante, con mucho Éter, haz Surge 5 veces.",
				],
			},
			{
				kind: "list",
				title: "3. Los 9 artefactos en Legendario o superior",
				items: [
					"Los artefactos dan Ciencia desde rareza Legendaria: combina hasta que las 9 ranuras sean Legendarias.",
					"Al combinar a Legendario+, mantén las 9 ranuras llenas con Legendario o superior.",
					"Legendario+, ++, Mítico… no dan bonus extra frente a Legendario.",
					"El Orbe Trascendente no da Ciencia extra en Legendario: busca bonus total, no rareza.",
				],
			},
		],
	},
	{
		id: "god-rank",
		n: "06",
		title: "Rango Dios, Energía Dimensional y Presets",
		summary: "Al llegar a Rango Dios se abren el Menú Dimensional y la Rueda de la Vida.",
		blocks: [
			{
				kind: "text",
				text: "Al alcanzar Rango Dios desbloqueas el Menú Dimensional y la Rueda de la Vida. Necesitas 1ca (1e+249) de Poder para empezar a producir Energía Dimensional.",
			},
			{
				kind: "list",
				title: "Preset Main (econ) inicial",
				items: [
					"Coge todos los nodos 1, luego los 2, luego los 3, y así sucesivamente.",
					"El hueco entre 5 y 6 depende de tu Cubo Eterno.",
				],
			},
			{
				kind: "list",
				title: "Preset Main (econ) tras Dios 13",
				items: [
					"Por debajo de rango dimensional 100: copia los nodos internos y añade 4 nodos de Energía Dimensional.",
					"Después coge cualquier nodo externo para los hitos dimensionales.",
					"Los nodos externos solo funcionan en Inmersión Dimensional: en el preset principal solo cuenta el hito.",
				],
			},
			{
				kind: "list",
				title: "Preset Dive",
				items: [
					"Copia los nodos internos y añade externos en este orden:",
					"Ciencia → Energía Dimensional → Bonus de Rango → Oro → Poder → Alma → Daño → …",
				],
			},
		],
	},
	{
		id: "enlightenment",
		n: "07",
		title: "Iluminación",
		summary: "Necesitas Iluminación nivel 1+ para obtener Cristal de Iluminación.",
		blocks: [
			{
				kind: "text",
				text: "Para conseguir Cristal de Iluminación necesitas tener Iluminación a nivel 1 o superior.",
			},
			{
				kind: "callout",
				tag: "RUTA",
				text: "Sociedad del Arte → Jardín de la Verdad → Fuente de Sabiduría → Iluminación",
			},
		],
	},
	{
		id: "ascension",
		n: "08",
		title: "Ascensión",
		summary: "Necesitas Ascensión nivel 1+ para obtener Piedra de la Verdad.",
		blocks: [
			{
				kind: "text",
				text: "Para conseguir Piedra de la Verdad necesitas tener Ascensión a nivel 1 o superior.",
			},
			{
				kind: "callout",
				tag: "RUTA",
				text: "Sociedad del Arte → Jardín de la Verdad → Camino de la Verdad → Ascensión",
			},
			{
				kind: "list",
				title: "Orden recomendado de mejoras de Verdad",
				items: [
					"光 Luz — 1 punto para quitar grado Común de Meditación.",
					"暗 Oscuridad — 1 punto para quitar grado Común del Camino de la Verdad.",
					"金 Metal — Ciencia y Puntos Cuánticos.",
					"風 Viento — Velocidad de minado y de forja.",
				],
			},
			{
				kind: "list",
				title: "Y considera también",
				items: [
					"生 Vida — más Éter máximo en Meditación: mejores rarezas (más Cristal de Iluminación).",
					"死 Muerte — más Cristal de Iluminación máximo en el Camino de la Verdad: mejores rarezas (más Piedra de la Verdad).",
				],
			},
		],
	},
	{
		id: "tldr",
		n: "09",
		title: "Resumen (tl;dr)",
		summary: "La ruta completa en una línea.",
		blocks: [
			{
				kind: "chips",
				title: "Ruta de progresión",
				chips: [
					"Presets",
					"Quimera 5+",
					"Iluminación",
					"Ascensión",
					"Ilum. 3 / Asc. 2",
					"6/4",
					"6/6",
					"8/7",
				],
			},
			{
				kind: "callout",
				tag: "NOTA",
				text: "Quimera 5 y Grifo 5 por el camino.",
			},
		],
	},
];
