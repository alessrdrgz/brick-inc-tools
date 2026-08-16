import { useLocale } from "@/components/i18n/LocaleProvider";
import { getAppMeta } from "@/data/app-meta";

const metaByLocale = { es: getAppMeta("es"), en: getAppMeta("en") };

export function AppPage() {
	const { locale, ui } = useLocale();
	const meta = metaByLocale[locale];

	return (
		<div className="panel-snap mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
			<section className="rounded-lg border border-border bg-card/50 p-5">
				<h1 className="mb-4 font-mono text-sm font-bold tracking-widest text-primary uppercase">
					{ui.todo}
				</h1>
				<ul className="space-y-2">
					{meta.todo.map((item) => (
						<li key={item} className="flex gap-2 text-sm text-foreground/80">
							<span className="text-muted-foreground">•</span>
							{item}
						</li>
					))}
				</ul>
			</section>

			<section className="rounded-lg border border-border bg-card/50 p-5 lg:col-span-1">
				<h2 className="mb-4 font-mono text-sm font-bold tracking-widest text-primary uppercase">
					{ui.versionHistory}
				</h2>
				<ul className="space-y-5">
					{meta.versions.map((v) => (
						<li key={v.date}>
							<p className="font-mono text-xs text-foreground">
								{v.date} — {v.game}
							</p>
							<ul className="mt-2 space-y-1">
								{v.notes.map((n) => (
									<li key={n} className="text-sm text-muted-foreground">
										{n}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</section>

			<section className="rounded-lg border border-border bg-card/50 p-5">
				<h2 className="mb-4 font-mono text-sm font-bold tracking-widest text-primary uppercase">
					{ui.credits}
				</h2>
				<ul className="space-y-2">
					{meta.credits.map((c) => (
						<li key={c} className="text-sm text-foreground/80">
							{c}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
