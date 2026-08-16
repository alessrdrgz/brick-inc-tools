import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { GameIcon } from "@/components/icons/GameIcon";
import type { UiDict } from "@/i18n/ui";
import {
	formatGameNumber,
	getScienceRecommendation,
	parseGameNumber,
	type ScienceRecommendation,
} from "@/lib/notation";

function recLabel(rec: ScienceRecommendation, ui: UiDict): string {
	switch (rec) {
		case "spend":
			return ui.recSpend;
		case "upgrade":
			return ui.recUpgrade;
		case "rankup":
			return ui.recRankUp;
		case "invalid":
			return ui.enterValues;
		default:
			return "";
	}
}

function Calculator({ science }: { science: boolean }) {
	const { ui } = useLocale();
	const [pps, setPps] = useState("");
	const [rank, setRank] = useState("");
	const [rankUp, setRankUp] = useState("");
	const [upgrade, setUpgrade] = useState("");

	const rec = useMemo(
		() =>
			getScienceRecommendation({
				productionPerSecond: parseGameNumber(pps) || 0,
				rank: parseGameNumber(rank) || 0,
				rankUpCost: parseGameNumber(rankUp) || 0,
				upgradeCost: parseGameNumber(upgrade) || 0,
				science,
			}),
		[pps, rank, rankUp, upgrade, science],
	);

	const fields = [
		{ label: ui.productionPerSecond, value: pps, set: setPps },
		{ label: ui.rank, value: rank, set: setRank },
		{ label: ui.rankUpCost, value: rankUp, set: setRankUp },
		{ label: ui.upgradeCost, value: upgrade, set: setUpgrade },
	] as const;

	return (
		<section className="rounded-lg border border-border bg-card/50 p-5">
			<h2 className="mb-4 flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-primary uppercase">
				<GameIcon
					src={science ? "ui_science_point.png" : "ui_quantum_point.png"}
					className="size-5"
				/>
				{science ? ui.scienceTitle : ui.quantumTitle}
			</h2>
			<div className="grid gap-3 sm:grid-cols-2">
				{fields.map((f) => (
					<label key={f.label} className="block space-y-1">
						<span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
							{f.label}
						</span>
						<input
							value={f.value}
							onChange={(e) => f.set(e.target.value)}
							inputMode="decimal"
							placeholder="1.5e12 / 4.82b"
							className="min-h-11 w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
						/>
						<span className="block font-mono text-[10px] text-muted-foreground">
							{formatGameNumber(parseGameNumber(f.value))}
						</span>
					</label>
				))}
			</div>
			<div className="mt-5 rounded border border-primary/30 bg-primary/5 px-4 py-3">
				<p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
					{ui.recommendation}
				</p>
				<p className="mt-1 font-mono text-sm text-primary">{recLabel(rec, ui) || "—"}</p>
			</div>
		</section>
	);
}

function ScienceInner() {
	const { locale, ui } = useLocale();
	return (
		<div className="panel-snap space-y-6">
			<header>
				<h1 className="font-mono text-2xl font-bold tracking-tight">{ui.nav.science}</h1>
				<p className="mt-2 max-w-[60ch] text-sm text-muted-foreground">
					{locale === "en"
						? "Enter production, rank and costs using game notation (K/M/B/T/a/b…)."
						: "Introduce producción, rango y costes con la notación del juego (K/M/B/T/a/b…)."}
				</p>
			</header>
			<div className="grid gap-6 lg:grid-cols-2">
				<Calculator science />
				<Calculator science={false} />
			</div>
		</div>
	);
}

export function SciencePage() {
	return <ScienceInner />;
}
