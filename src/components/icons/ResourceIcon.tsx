import { GameIcon } from "@/components/icons/GameIcon";
import resourcesData from "@/data/resources.json";

type Resource = { id: string; imageName: string };

const imageById = new Map((resourcesData as Resource[]).map((r) => [r.id, r.imageName]));

/** Prefer game PNG from resources.json; fall back to a tiny colored square. */
export function ResourceIcon({ id, className = "size-4" }: { id: string; className?: string }) {
	const imageName = imageById.get(id);
	if (imageName) {
		return <GameIcon src={imageName} className={className} />;
	}
	return (
		<span aria-hidden className={`inline-block shrink-0 rounded-sm bg-primary/60 ${className}`} />
	);
}

export function StatIcon({ type, className = "size-4" }: { type: string; className?: string }) {
	const t = type.toLowerCase();
	let fill = "#3eb5e8";
	if (t.includes("damage") || t.includes("atk")) fill = "#f87171";
	if (t.includes("power")) fill = "#fbbf24";
	if (t.includes("science")) fill = "#60a5fa";
	if (t.includes("soul")) fill = "#c084fc";
	if (t.includes("gold")) fill = "#f59e0b";
	if (t.includes("dimensional") || t.includes("ether")) fill = "#22d3ee";

	return (
		<svg className={className} viewBox="0 0 24 24" aria-hidden>
			{t.includes("science") ? (
				<>
					<circle cx="12" cy="12" r="3" fill={fill} />
					<circle cx="12" cy="12" r="8" fill="none" stroke={fill} strokeWidth="1.5" />
					<path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22" stroke={fill} strokeWidth="1.5" />
				</>
			) : t.includes("power") ? (
				<path d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z" fill={fill} />
			) : t.includes("damage") || t.includes("weapon") ? (
				<path d="M4 20 L14 4 L16 6 L6 22 Z M14 4 L18 2 L20 6 L16 6 Z" fill={fill} />
			) : (
				<circle cx="12" cy="12" r="7" fill={fill} />
			)}
		</svg>
	);
}
