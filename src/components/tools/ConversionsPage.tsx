import { lazy, Suspense, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
	type Conversion,
	ConversionFiltersBar,
	ConversionsTable,
	type Resource,
	useConversionFilters,
} from "@/components/tools/ConversionsTable";
import conversionsData from "@/data/conversions.json";
import resourcesData from "@/data/resources.json";

const ConversionsGraph = lazy(() =>
	import("@/components/tools/ConversionsGraph").then((m) => ({ default: m.ConversionsGraph })),
);

const resources = resourcesData as Resource[];
const conversions = conversionsData as Conversion[];

function ConversionsInner() {
	const { locale, ui } = useLocale();
	const [view, setView] = useState<"table" | "graph">("table");
	const filters = useConversionFilters(conversions, resources);

	return (
		<div className="panel-snap flex min-h-[70vh] flex-col gap-4">
			<header>
				<h1 className="font-mono text-2xl font-bold tracking-tight">{ui.nav.conversions}</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{locale === "en"
						? "Filter conversion paths between resources."
						: "Filtra rutas de conversión entre recursos."}
				</p>
			</header>

			<div className="flex flex-wrap gap-2">
				{(
					[
						["table", ui.viewTable],
						["graph", ui.viewGraph],
					] as const
				).map(([id, label]) => (
					<button
						key={id}
						type="button"
						onClick={() => setView(id)}
						className={`min-h-11 rounded border px-4 py-2 font-mono text-xs tracking-widest ${
							view === id
								? "border-primary bg-primary/15 text-primary"
								: "border-border text-muted-foreground hover:border-primary/40"
						}`}
					>
						{label}
					</button>
				))}
			</div>

			<ConversionFiltersBar
				resources={resources}
				fromId={filters.fromId}
				setFromId={filters.setFromId}
				toId={filters.toId}
				setToId={filters.setToId}
				source={filters.source}
				setSource={filters.setSource}
				query={filters.query}
				setQuery={filters.setQuery}
				sources={filters.sources}
				ui={ui}
				locale={locale}
			/>

			{view === "table" ? (
				<ConversionsTable filtered={filters.filtered} resourceMap={filters.resourceMap} />
			) : (
				<Suspense
					fallback={
						<div className="flex h-[60dvh] min-h-[360px] items-center justify-center rounded-lg border border-border font-mono text-xs text-muted-foreground">
							…
						</div>
					}
				>
					<ConversionsGraph filtered={filters.filtered} resourceMap={filters.resourceMap} />
				</Suspense>
			)}
		</div>
	);
}

export function ConversionsPage() {
	return <ConversionsInner />;
}
