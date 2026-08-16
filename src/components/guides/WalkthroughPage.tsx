import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StepPanel } from "@/components/guides/StepPanel";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { unitScale } from "@/data/types";
import { steps as stepsEn } from "@/data/walkthrough-en";
import { steps as stepsEs } from "@/data/walkthrough-es";

const stepsByLocale = { es: stepsEs, en: stepsEn } as const;

function UnitScaleAside() {
	return (
		<dl className="space-y-3">
			{unitScale.map((u) => (
				<div key={u.unit} className="flex items-baseline justify-between gap-2 font-mono text-xs">
					<dt className="text-primary">{u.unit}</dt>
					<dd className="text-muted-foreground">{u.value}</dd>
				</div>
			))}
		</dl>
	);
}

export function WalkthroughPage() {
	const { locale, ui } = useLocale();
	const { step: stepParam } = useParams<{ step?: string }>();
	const steps = stepsByLocale[locale];
	const [open, setOpen] = useState<string[]>(["mechanics", "presets"]);

	useEffect(() => {
		if (!stepParam) return;
		const el = document.getElementById(stepParam);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		setOpen((prev) => (prev.includes(stepParam) ? prev : [...prev, stepParam]));
	}, [stepParam]);

	const toggle = (id: string) =>
		setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

	const done = open.length;
	const pct = Math.round((done / steps.length) * 100);

	const title = useMemo(
		() => (locale === "en" ? "MAIN WALKTHROUGH" : "WALKTHROUGH PRINCIPAL"),
		[locale],
	);

	return (
		<div className="flex flex-col gap-8 xl:flex-row">
			<div className="min-w-0 flex-1">
				<header className="mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h1 className="font-mono text-2xl font-bold tracking-tight">{title}</h1>
						<p className="mt-2 max-w-[62ch] text-sm text-muted-foreground">
							{locale === "en"
								? "Nine ordered steps, from hidden mechanics to Ascension."
								: "Nueve pasos ordenados, de las mecánicas ocultas hasta la Ascensión."}
						</p>
					</div>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setOpen(steps.map((s) => s.id))}
							className="min-h-11 rounded border border-border px-3 py-1.5 font-mono text-[10px] tracking-widest transition-colors hover:border-primary/50 hover:text-primary"
						>
							{ui.openAll}
						</button>
						<button
							type="button"
							onClick={() => setOpen([])}
							className="min-h-11 rounded border border-border px-3 py-1.5 font-mono text-[10px] tracking-widest transition-colors hover:border-primary/50 hover:text-primary"
						>
							{ui.closeAll}
						</button>
					</div>
				</header>

				<details className="mb-6 rounded-lg border border-border bg-card/40 p-3 xl:hidden">
					<summary className="cursor-pointer font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
						{ui.unitScale}
					</summary>
					<div className="mt-3">
						<UnitScaleAside />
					</div>
				</details>

				<div className="mb-4 flex flex-wrap gap-2">
					{steps.map((step) => (
						<Link
							key={step.id}
							to={`/guides/walkthrough/${step.id}`}
							className="rounded border border-border px-2 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
						>
							{step.n} · {step.title}
						</Link>
					))}
				</div>

				<div className="mb-4 font-mono text-[10px] text-muted-foreground">
					{ui.progress}: {done} {ui.stepsOf} {steps.length} {ui.stepsLabel} / {pct}%
				</div>

				<div id="walkthrough" className="max-w-4xl space-y-4">
					{steps.map((step) => (
						<StepPanel
							key={`${locale}-${step.id}`}
							step={step}
							open={open.includes(step.id)}
							onToggle={() => toggle(step.id)}
						/>
					))}
				</div>
			</div>

			<aside className="hidden shrink-0 xl:block xl:w-48">
				<h2 className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
					{ui.unitScale}
				</h2>
				<UnitScaleAside />
			</aside>
		</div>
	);
}
