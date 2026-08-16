import { useLocale } from "@/components/i18n/LocaleProvider";
import { GameIcon } from "@/components/icons/GameIcon";
import type { Step } from "@/data/types";

const INLINE_ICONS: { match: RegExp; icon: string }[] = [
	{ match: /\b(damage|daño)\b/i, icon: "ui_bs_damage.png" },
	{ match: /\b(power|poder)\b/i, icon: "ui_power.png" },
	{ match: /\b(science|ciencia)\b/i, icon: "ui_science_point.png" },
	{ match: /\b(quantum|cuántic)/i, icon: "ui_quantum_point.png" },
	{ match: /\bchimera\b/i, icon: "dv_chimera.png" },
	{ match: /\bgolden cube\b/i, icon: "sci_icon_goldcube.png" },
	{ match: /\bcubo dorado\b/i, icon: "sci_icon_goldcube.png" },
	{ match: /\betherm?\b/i, icon: "ui_ether.png" },
	{ match: /\béter\b/i, icon: "ui_ether.png" },
	{ match: /\bgem\b/i, icon: "ui_gem.png" },
	{ match: /\bgema\b/i, icon: "ui_gem.png" },
	{ match: /\bsoul\b/i, icon: "sub_soul.png" },
	{ match: /\bart society\b/i, icon: "sub_artsociety.png" },
	{ match: /\bgarden of truth\b/i, icon: "art_truthgarden.png" },
	{ match: /\benlightenment|iluminaci/i, icon: "ui_truth_crystal.png" },
	{ match: /\bascension|ascensi/i, icon: "ui_truth_stone.png" },
	{ match: /\bseed of enlightenment|semilla/i, icon: "ui_truth_seed.png" },
];

function IconPrefix({ text }: { text: string }) {
	const hit = INLINE_ICONS.find((x) => x.match.test(text));
	if (!hit) return null;
	return <GameIcon src={hit.icon} className="mt-0.5 size-4" />;
}

function Blocks({ step }: { step: Step }) {
	return (
		<div className="space-y-5">
			{step.blocks.map((block, i) => {
				if (block.kind === "text") {
					return (
						<p
							key={i}
							className="flex max-w-[68ch] gap-2 text-[15px] leading-relaxed text-foreground/85"
						>
							<IconPrefix text={block.text} />
							<span>{block.text}</span>
						</p>
					);
				}
				if (block.kind === "callout") {
					return (
						<div
							key={i}
							className="flex items-start gap-3 rounded border border-border bg-background/40 p-3"
						>
							<IconPrefix text={`${block.tag} ${block.text}`} />
							<span className="font-mono text-xs whitespace-nowrap text-primary">{block.tag}</span>
							<span className="text-sm leading-snug text-foreground/85">{block.text}</span>
						</div>
					);
				}
				if (block.kind === "list") {
					return (
						<div key={i} className="space-y-2">
							{block.title && (
								<h3 className="font-mono text-xs font-bold tracking-wide text-foreground uppercase">
									{block.title}
								</h3>
							)}
							<ul className="space-y-1.5">
								{block.items.map((item, j) => (
									<li key={j} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
										<IconPrefix text={item} />
										{!INLINE_ICONS.some((x) => x.match.test(item)) && (
											<span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-primary" />
										)}
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					);
				}
				if (block.kind === "chips") {
					return (
						<div key={i} className="space-y-2">
							<h3 className="font-mono text-xs font-bold tracking-wide text-foreground uppercase">
								{block.title}
							</h3>
							<ol className="flex flex-wrap items-center gap-2">
								{block.chips.map((chip, j) => (
									<li key={j} className="flex items-center gap-2">
										<span className="inline-flex items-center gap-1.5 rounded border border-primary/30 bg-primary/5 px-2 py-1 font-mono text-[11px] text-primary">
											<IconPrefix text={chip} />
											{chip}
										</span>
										{j < block.chips.length - 1 && (
											<span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
												→
											</span>
										)}
									</li>
								))}
							</ol>
						</div>
					);
				}
				return (
					<div key={i} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
						{block.items.map((preset) => (
							<article
								key={preset.code}
								className="flex flex-col rounded border border-border bg-background/50 p-4 transition-colors hover:border-primary/50"
							>
								<div className="mb-2 font-mono text-[10px] text-muted-foreground">
									{preset.code}
								</div>
								<h4 className="mb-2 font-mono text-sm font-bold tracking-wide text-foreground uppercase">
									{preset.name}
								</h4>
								<p className="mb-3 text-[13px] leading-snug text-foreground/75">{preset.use}</p>
								<ul className="mt-auto flex flex-wrap gap-1.5">
									{preset.stats.map((stat) => (
										<li
											key={stat}
											className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground/80"
										>
											<IconPrefix text={stat} />
											{stat}
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				);
			})}
		</div>
	);
}

export function StepPanel({
	step,
	open,
	onToggle,
}: {
	step: Step;
	open: boolean;
	onToggle: () => void;
}) {
	const { ui } = useLocale();
	const panelId = `panel-${step.id}`;

	return (
		<section
			id={step.id}
			className={`scroll-mt-8 overflow-hidden rounded-lg border transition-colors ${
				open ? "border-primary/25 bg-card" : "border-border bg-card/40"
			}`}
		>
			<h2>
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					aria-controls={panelId}
					className="flex min-h-11 w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<span className="flex min-w-0 items-center gap-4">
						<span
							className={`flex size-8 shrink-0 items-center justify-center rounded border font-mono text-xs font-bold ${
								open
									? "border-primary bg-primary/10 text-primary"
									: "border-border text-muted-foreground"
							}`}
						>
							{step.n}
						</span>
						<span className="min-w-0">
							<span className="block font-mono text-sm font-bold tracking-tight text-foreground uppercase">
								{step.title}
							</span>
							<span className="mt-1 block line-clamp-2 text-[13px] text-muted-foreground">
								{step.summary}
							</span>
						</span>
					</span>
					<span className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
						{open ? ui.close : ui.open}
					</span>
				</button>
			</h2>
			{open && (
				<div id={panelId} className="border-t border-border p-4 sm:p-6">
					<Blocks step={step} />
				</div>
			)}
		</section>
	);
}
