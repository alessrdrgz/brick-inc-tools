import { useEffect, useRef } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import type { Conversion, Resource } from "@/components/tools/ConversionsTable";
import { limitLabel } from "@/components/tools/ConversionsTable";

const ICON_BASE = "/assets/icons";
const FALLBACK_ICON = "ui_bo_power.png";

export function ConversionsGraph({
	filtered,
	resourceMap,
}: {
	filtered: Conversion[];
	resourceMap: Map<string, Resource>;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const networkRef = useRef<Network | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const usedIds = new Set<string>();
		for (const c of filtered) {
			usedIds.add(c.from);
			usedIds.add(c.to);
		}

		const nodes = new DataSet(
			[...usedIds].map((id) => {
				const r = resourceMap.get(id);
				return {
					id,
					title: r?.name ?? id,
					shape: "image",
					image: `${ICON_BASE}/${r?.imageName ?? FALLBACK_ICON}`,
					brokenImage: `${ICON_BASE}/${FALLBACK_ICON}`,
					size: 22,
				};
			}),
		);

		const edges = new DataSet(
			filtered.map((c, i) => {
				const fromRes = resourceMap.get(c.from);
				const toRes = resourceMap.get(c.to);
				const fromUnit = c.fromCount === 1 ? fromRes?.singleUnit : fromRes?.pluralUnit;
				const toUnit = c.toCount === 1 ? toRes?.singleUnit : toRes?.pluralUnit;
				const lim = limitLabel(c);
				return {
					id: i,
					from: c.from,
					to: c.to,
					arrows: "to",
					label: `${c.fromCount} ${fromUnit ?? ""} : ${c.toCount} ${toUnit ?? ""} ${lim === "—" ? "" : lim}`,
					font: { color: "#94a3b8", size: 10, face: "JetBrains Mono", strokeWidth: 0 },
					color: { color: "#3eb5e8", highlight: "#7dd3fc" },
				};
			}),
		);

		networkRef.current?.destroy();
		const network = new Network(
			containerRef.current,
			{ nodes, edges },
			{
				physics: {
					enabled: true,
					barnesHut: {
						gravitationalConstant: -14000,
						springLength: 240,
						avoidOverlap: 0.6,
					},
					stabilization: { iterations: 120 },
				},
				interaction: { hover: true, tooltipDelay: 100, zoomView: true, dragView: true },
				edges: { smooth: { enabled: true, type: "cubicBezier", roundness: 0.3 } },
			},
		);
		networkRef.current = network;

		network.once("stabilizationIterationsDone", () => {
			network.setOptions({ physics: { enabled: false } });
		});

		return () => {
			network.destroy();
			networkRef.current = null;
		};
	}, [filtered, resourceMap]);

	return (
		<div
			ref={containerRef}
			className="h-[60dvh] min-h-[360px] w-full rounded-lg border border-border bg-[#0f1729]"
		/>
	);
}
