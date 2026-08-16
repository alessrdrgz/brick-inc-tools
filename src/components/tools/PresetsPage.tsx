import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { AppShell } from "@/components/layout/AppShell";
import type { PresetDef, StatType, TruthNode } from "@/components/tools/preset-types";
import { TruthBoard } from "@/components/tools/TruthBoard";
import presetsData from "@/data/presets.json";
import statTypesData from "@/data/stat-types.json";
import nodesData from "@/data/truth-nodes.json";
import ringsData from "@/data/truth-nodes-rings.json";
import { DEFAULT_LOCALE } from "@/i18n/locale";

const presets = presetsData as PresetDef[];
const nodes = nodesData as TruthNode[];
const nodeGrid = ringsData as TruthNode[][];
const statTypes = statTypesData as StatType[];

const PRESET_ORDER = ["Main (econ)", "Buy", "Push", "Rank Up", "Combat", "Mine"] as const;

function buildNodeMaps() {
	const nodeMap = new Map<string, TruthNode & { neighbors: string[] }>();
	for (const n of nodes) {
		nodeMap.set(n.id, { ...n, neighbors: n.neighborIds });
	}
	const unitMap = new Map(statTypes.map((s) => [s.type, s.unitValue]));
	return { nodeMap, unitMap };
}

function calculateScores(selected: PresetDef, unitMap: Map<string, number>): Map<string, number> {
	const scores = new Map<string, number>();
	for (const n of nodes) {
		let o = 0;
		for (const r of n.stats) {
			const weight = selected.statWeights[r.type] ?? 0;
			const unit = unitMap.get(r.type) ?? 1;
			o += (r.value / unit) * weight;
		}
		scores.set(n.id, o);
	}
	return scores;
}

function getNeighborScore(
	nodeId: string,
	nodeMap: Map<string, TruthNode & { neighbors: string[] }>,
	nodeScoreMap: Map<string, number>,
	presetBuildMap: Map<string, boolean>,
): number {
	const start = nodeMap.get(nodeId);
	if (!start) return -1;
	let n = nodeScoreMap.get(nodeId) ?? 0;
	const visited = new Map<string, boolean>();
	let frontier = new Set<TruthNode & { neighbors: string[] }>([start]);
	for (let m = 0; m < 7; m++) {
		const next = new Set<TruthNode & { neighbors: string[] }>();
		for (const k of frontier) {
			for (const nid of k.neighbors) {
				if (presetBuildMap.get(nid) || visited.get(nid)) continue;
				const neighbor = nodeMap.get(nid);
				if (!neighbor) continue;
				n += (nodeScoreMap.get(nid) ?? 0) * 0.5 ** (m + 1);
				visited.set(nid, true);
				next.add(neighbor);
			}
		}
		frontier = next;
	}
	return n;
}

function buildPreset(seedCount: number, selected: PresetDef, unitMap: Map<string, number>) {
	const { nodeMap } = buildNodeMaps();
	const nodeScoreMap = calculateScores(selected, unitMap);
	const presetBuildMap = new Map<string, boolean>();
	presetBuildMap.set("0", true);
	const active = new Set<string>(["0"]);

	for (let i = 0; i < seedCount; i++) {
		let bestId: string | null = null;
		let bestScore = -1;
		for (const id of active) {
			const node = nodeMap.get(id);
			if (!node) continue;
			for (const mid of node.neighbors) {
				if (presetBuildMap.get(mid)) continue;
				const score = getNeighborScore(mid, nodeMap, nodeScoreMap, presetBuildMap);
				if (score > bestScore) {
					bestScore = score;
					bestId = mid;
				}
			}
		}
		if (bestId == null) break;
		presetBuildMap.set(bestId, true);
		active.add(bestId);
		for (const id of [...active]) {
			const node = nodeMap.get(id);
			if (node?.neighborIds.every((m) => presetBuildMap.get(m))) active.delete(id);
		}
	}
	return presetBuildMap;
}

async function exportPreset(
	seedCount: number,
	selectedType: string,
	buildMap: Map<string, boolean>,
): Promise<string> {
	const ringSizes = [8, 16, 24, 32, 40, 48, 56, 64];
	const order: string[] = [];
	for (let ring = 1; ring <= ringSizes.length; ring++) {
		const size = ringSizes[ring - 1] ?? 0;
		for (let i = 1; i <= size; i++) order.push(`${ring}-${i}`);
	}
	const index = Object.fromEntries(order.map((id, i) => [id, i]));
	const bytes = new Uint8Array(36);
	for (const [id, on] of buildMap) {
		if (!on || id === "0") continue;
		const ce = index[id];
		if (ce === undefined) continue;
		bytes[ce >> 3]! |= 1 << (ce & 7);
	}

	let encoded: string;
	try {
		const brotliMod = await import("brotli-wasm");
		const mod = (await (
			brotliMod as unknown as { default: Promise<{ compress: (d: Uint8Array) => Uint8Array }> }
		).default) as {
			compress: (d: Uint8Array) => Uint8Array;
		};
		const compressed = mod.compress(bytes);
		let bin = "";
		for (let i = 0; i < compressed.byteLength; i++) bin += String.fromCharCode(compressed[i]!);
		encoded = btoa(bin);
	} catch {
		// fallback: raw base64 of uncompressed bitfield
		let bin = "";
		for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]!);
		encoded = btoa(bin);
	}

	let name = selectedType;
	if (name === "Main (econ)") name = "Main";
	return `[${seedCount}] Tree of Truth : ${name} (*TT*${encoded}*)`;
}

function PresetsInner() {
	const { locale, ui } = useLocale();
	const { unitMap } = useMemo(() => buildNodeMaps(), []);
	const [selectedType, setSelectedType] = useState<string>("Main (econ)");
	const selected = presets.find((p) => p.name === selectedType) ?? presets[0]!;
	const [seedCount, setSeedCount] = useState(0);
	const [buildMap, setBuildMap] = useState<Map<string, boolean>>(() => new Map([["0", true]]));
	const [exportCode, setExportCode] = useState("");
	const [copied, setCopied] = useState(false);
	const [scale, setScale] = useState(0.75);

	useEffect(() => {
		if (window.matchMedia("(max-width: 640px)").matches) setScale(0.5);
	}, []);

	const runBuild = useCallback(
		(seeds: number, type: string) => {
			const preset = presets.find((p) => p.name === type) ?? presets[0]!;
			const clamped = Math.min(Math.max(0, seeds), preset.maximumSeeds);
			const map = buildPreset(clamped, preset, unitMap);
			setBuildMap(map);
			return map;
		},
		[unitMap],
	);

	const selectedNodes = useMemo(
		() => nodes.filter((n) => buildMap.get(n.id) && n.id !== "0"),
		[buildMap],
	);

	const help = useMemo(() => {
		const map: Record<string, { es: string; en: string }> = {
			"Main (econ)": {
				es: "Preset por defecto: úsalo más del 99% del tiempo.",
				en: "Default preset — use it over 99% of the time.",
			},
			Buy: {
				es: "Temporal: comprar investigación, armas y mejoras de alma.",
				en: "Temporary: buying research, weapons, and soul enhancements.",
			},
			Push: {
				es: "Temporal: romper ladrillos altos o matar bestias divinas.",
				en: "Temporary: break highest bricks or kill divine beasts.",
			},
			"Rank Up": {
				es: "Temporal: subir de rango antes.",
				en: "Temporary: rank up earlier.",
			},
			Combat: {
				es: "Temporal: Templo del Caos y Punto de Lagrange.",
				en: "Temporary: Temple of Chaos and Lagrange Point.",
			},
			Mine: {
				es: "Temporal: relojes mágicos en la mina.",
				en: "Temporary: magic clocks on the mine.",
			},
		};
		return map[selectedType]?.[locale] ?? "";
	}, [selectedType, locale]);

	return (
		<div className="panel-snap space-y-6">
			<header>
				<h1 className="font-mono text-2xl font-bold tracking-tight">{ui.nav.presets}</h1>
				<p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">{help}</p>
			</header>

			<div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
				{PRESET_ORDER.map((name) => (
					<label
						key={name}
						className={`shrink-0 cursor-pointer rounded border px-3 py-2.5 font-mono text-[11px] tracking-wide ${
							selectedType === name
								? "border-primary bg-primary/15 text-primary"
								: "border-border text-muted-foreground hover:border-primary/40"
						}`}
					>
						<input
							type="radio"
							className="sr-only"
							name="preset"
							checked={selectedType === name}
							onChange={() => {
								setSelectedType(name);
								const preset = presets.find((p) => p.name === name)!;
								const nextSeeds = Math.min(seedCount, preset.maximumSeeds);
								setSeedCount(nextSeeds);
								runBuild(nextSeeds, name);
							}}
						/>
						{name}
					</label>
				))}
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
				<label className="space-y-1 sm:w-auto">
					<span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
						{ui.seedLabel}
					</span>
					<input
						type="number"
						min={0}
						max={selected.maximumSeeds}
						value={seedCount}
						onChange={(e) => {
							const v = Number(e.target.value) || 0;
							setSeedCount(v);
							runBuild(v, selectedType);
						}}
						className="block min-h-11 w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary sm:w-32"
					/>
					<span className="font-mono text-[10px] text-muted-foreground">
						Max {selected.maximumSeeds}
					</span>
				</label>

				<button
					type="button"
					onClick={() => runBuild(seedCount, selectedType)}
					className="min-h-11 w-full rounded border border-primary bg-primary/15 px-4 py-2 font-mono text-xs tracking-widest text-primary hover:bg-primary/25 sm:w-auto"
				>
					{ui.build}
				</button>

				<button
					type="button"
					onClick={async () => {
						const map = buildMap.size > 1 ? buildMap : runBuild(seedCount, selectedType);
						const code = await exportPreset(seedCount, selectedType, map);
						setExportCode(code);
					}}
					className="min-h-11 w-full rounded border border-border px-4 py-2 font-mono text-xs tracking-widest text-foreground hover:border-primary/50 sm:w-auto"
				>
					{ui.export}
				</button>
			</div>

			<p className="font-mono text-[11px] text-muted-foreground">
				{ui.relevantRange}: {selected.relevantRange.min} ~ {selected.relevantRange.max}{" "}
				{ui.canDeviate}
				<br />
				{ui.presetComplete}: {selected.maximumSeeds} {ui.seeds}
			</p>

			{exportCode && (
				<textarea
					readOnly
					value={exportCode}
					onClick={async () => {
						try {
							await navigator.clipboard.writeText(exportCode);
							setCopied(true);
							setTimeout(() => setCopied(false), 1500);
						} catch {
							/* ignore */
						}
					}}
					rows={3}
					className="w-full rounded border border-border bg-background p-3 font-mono text-xs text-foreground"
				/>
			)}
			{copied && <p className="font-mono text-[10px] text-primary">{ui.copied}</p>}

			<div className="space-y-2">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
						Tree of Truth — {selectedNodes.length} nodes
					</div>
					<div className="flex gap-1">
						{(
							[
								[0.5, ui.zoomOut],
								[0.75, "75%"],
								[1, ui.zoomReset],
							] as const
						).map(([s, label]) => (
							<button
								key={s}
								type="button"
								onClick={() => setScale(s)}
								className={`min-h-9 rounded border px-2 py-1 font-mono text-[10px] ${
									scale === s
										? "border-primary text-primary"
										: "border-border text-muted-foreground"
								}`}
							>
								{label}
							</button>
						))}
					</div>
				</div>
				<TruthBoard
					grid={nodeGrid}
					buildMap={buildMap}
					statTypes={statTypes}
					scale={scale}
					onToggle={(id) => {
						if (id === "0") return;
						setBuildMap((prev) => {
							const next = new Map(prev);
							if (next.get(id)) next.delete(id);
							else next.set(id, true);
							next.set("0", true);
							return next;
						});
					}}
				/>
			</div>
		</div>
	);
}

export function PresetsPage() {
	return (
		<AppShell initialLocale={DEFAULT_LOCALE} active="presets">
			<PresetsInner />
		</AppShell>
	);
}
