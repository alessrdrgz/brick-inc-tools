import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ResourceIcon } from "@/components/icons/ResourceIcon";
import type { UiDict } from "@/i18n/ui";

export type Resource = {
	id: string;
	name: string;
	imageName: string;
	singleUnit: string;
	pluralUnit: string;
};

export type Conversion = {
	from: string;
	to: string;
	fromCount: number;
	toCount: number;
	gemValue: number;
	bookValue: number;
	dailyLimit: number;
	weeklyLimit: number;
	totalLimit: number;
	deadline: string;
	source: string;
};

const SOURCE_LABELS: Record<string, { es: string; en: string }> = {
	challenge: { es: "Challenge", en: "Challenge" },
	prismshop: { es: "Prism Shop", en: "Prism Shop" },
	shop: { es: "Shop", en: "Shop" },
	booster: { es: "Booster", en: "Booster Shop" },
	"1.5y": { es: "Evento 1.5y", en: "1.5 Year Event" },
	winter: { es: "Snowy Night", en: "Snowy Night" },
};

export function limitLabel(c: Conversion): string {
	if (c.dailyLimit) return `/${c.dailyLimit}d`;
	if (c.weeklyLimit) return `/${c.weeklyLimit}w`;
	if (c.totalLimit) return `/${c.totalLimit}t`;
	return "—";
}

export function sourceLabel(source: string, locale: "es" | "en"): string {
	return SOURCE_LABELS[source]?.[locale] ?? source;
}

export function useConversionFilters(conversions: Conversion[], resources: Resource[]) {
	const [fromId, setFromId] = useState("");
	const [toId, setToId] = useState("");
	const [source, setSource] = useState("");
	const [query, setQuery] = useState("");

	const resourceMap = useMemo(() => new Map(resources.map((r) => [r.id, r])), [resources]);

	const sources = useMemo(
		() => [...new Set(conversions.map((c) => c.source))].sort(),
		[conversions],
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return conversions.filter((c) => {
			if (fromId && c.from !== fromId) return false;
			if (toId && c.to !== toId) return false;
			if (source && c.source !== source) return false;
			if (q) {
				const fromName = resourceMap.get(c.from)?.name ?? c.from;
				const toName = resourceMap.get(c.to)?.name ?? c.to;
				const hay = `${fromName} ${toName} ${c.source}`.toLowerCase();
				if (!hay.includes(q)) return false;
			}
			return true;
		});
	}, [conversions, fromId, toId, source, query, resourceMap]);

	return {
		fromId,
		setFromId,
		toId,
		setToId,
		source,
		setSource,
		query,
		setQuery,
		sources,
		filtered,
		resourceMap,
	};
}

export function ConversionFiltersBar({
	resources,
	fromId,
	setFromId,
	toId,
	setToId,
	source,
	setSource,
	query,
	setQuery,
	sources,
	ui,
	locale,
}: {
	resources: Resource[];
	fromId: string;
	setFromId: (v: string) => void;
	toId: string;
	setToId: (v: string) => void;
	source: string;
	setSource: (v: string) => void;
	query: string;
	setQuery: (v: string) => void;
	sources: string[];
	ui: UiDict;
	locale: "es" | "en";
}) {
	const selectClass =
		"block w-full min-w-0 rounded border border-border bg-background px-3 py-2.5 font-mono text-xs sm:min-w-[160px]";

	return (
		<div className="flex flex-wrap items-end gap-3 rounded border border-border bg-card/40 p-4">
			<p className="w-full font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
				{ui.filters}
			</p>
			<label className="min-w-[140px] flex-1 space-y-1">
				<span className="font-mono text-[10px] text-muted-foreground uppercase">{ui.from}</span>
				<select value={fromId} onChange={(e) => setFromId(e.target.value)} className={selectClass}>
					<option value="">{ui.all}</option>
					{resources.map((r) => (
						<option key={r.id} value={r.id}>
							{r.name}
						</option>
					))}
				</select>
			</label>
			<label className="min-w-[140px] flex-1 space-y-1">
				<span className="font-mono text-[10px] text-muted-foreground uppercase">{ui.to}</span>
				<select value={toId} onChange={(e) => setToId(e.target.value)} className={selectClass}>
					<option value="">{ui.all}</option>
					{resources.map((r) => (
						<option key={r.id} value={r.id}>
							{r.name}
						</option>
					))}
				</select>
			</label>
			<label className="min-w-[140px] flex-1 space-y-1">
				<span className="font-mono text-[10px] text-muted-foreground uppercase">{ui.source}</span>
				<select value={source} onChange={(e) => setSource(e.target.value)} className={selectClass}>
					<option value="">{ui.all}</option>
					{sources.map((s) => (
						<option key={s} value={s}>
							{sourceLabel(s, locale)}
						</option>
					))}
				</select>
			</label>
			<label className="min-w-[160px] flex-[2] space-y-1">
				<span className="font-mono text-[10px] text-muted-foreground uppercase">{ui.search}</span>
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={ui.search}
					className={selectClass}
				/>
			</label>
		</div>
	);
}

export function ConversionsTable({
	filtered,
	resourceMap,
}: {
	filtered: Conversion[];
	resourceMap: Map<string, Resource>;
}) {
	const { locale, ui } = useLocale();

	if (filtered.length === 0) {
		return <p className="font-mono text-sm text-muted-foreground">{ui.noResults}</p>;
	}

	return (
		<>
			{/* Mobile cards */}
			<ul className="space-y-3 sm:hidden">
				{filtered.map((c) => {
					const fromRes = resourceMap.get(c.from);
					const toRes = resourceMap.get(c.to);
					return (
						<li
							key={`${c.from}-${c.to}-${c.fromCount}-${c.source}`}
							className="rounded-lg border border-border bg-card/50 p-4"
						>
							<div className="flex items-center gap-2 font-mono text-xs">
								<ResourceIcon id={c.from} className="size-5" />
								<span>{fromRes?.name ?? c.from}</span>
								<span className="text-muted-foreground">→</span>
								<ResourceIcon id={c.to} className="size-5" />
								<span>{toRes?.name ?? c.to}</span>
							</div>
							<dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-muted-foreground">
								<div>
									<dt className="uppercase">{ui.ratio}</dt>
									<dd className="text-foreground">
										{c.fromCount}:{c.toCount}
									</dd>
								</div>
								<div>
									<dt className="uppercase">{ui.limit}</dt>
									<dd className="text-foreground">{limitLabel(c)}</dd>
								</div>
								<div>
									<dt className="uppercase">{ui.source}</dt>
									<dd className="text-foreground">{sourceLabel(c.source, locale)}</dd>
								</div>
								<div>
									<dt className="uppercase">{ui.gemValue}</dt>
									<dd className="text-foreground">{c.gemValue || "—"}</dd>
								</div>
							</dl>
						</li>
					);
				})}
			</ul>

			{/* Desktop table */}
			<div className="hidden overflow-x-auto rounded-lg border border-border sm:block">
				<table className="w-full min-w-[640px] border-collapse text-left font-mono text-xs">
					<thead className="border-b border-border bg-card/60 text-[10px] tracking-widest text-muted-foreground uppercase">
						<tr>
							<th className="px-3 py-3">{ui.from}</th>
							<th className="px-3 py-3">{ui.to}</th>
							<th className="px-3 py-3">{ui.ratio}</th>
							<th className="px-3 py-3">{ui.limit}</th>
							<th className="px-3 py-3">{ui.gemValue}</th>
							<th className="px-3 py-3">{ui.bookValue}</th>
							<th className="px-3 py-3">{ui.source}</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((c) => {
							const fromRes = resourceMap.get(c.from);
							const toRes = resourceMap.get(c.to);
							return (
								<tr
									key={`${c.from}-${c.to}-${c.fromCount}-${c.source}`}
									className="border-b border-border/60 hover:bg-primary/5"
								>
									<td className="px-3 py-2.5">
										<span className="inline-flex items-center gap-2">
											<ResourceIcon id={c.from} className="size-4" />
											{fromRes?.name ?? c.from}
										</span>
									</td>
									<td className="px-3 py-2.5">
										<span className="inline-flex items-center gap-2">
											<ResourceIcon id={c.to} className="size-4" />
											{toRes?.name ?? c.to}
										</span>
									</td>
									<td className="px-3 py-2.5 whitespace-nowrap">
										{c.fromCount}:{c.toCount}
									</td>
									<td className="px-3 py-2.5">{limitLabel(c)}</td>
									<td className="px-3 py-2.5">{c.gemValue || "—"}</td>
									<td className="px-3 py-2.5">{c.bookValue || "—"}</td>
									<td className="px-3 py-2.5">{sourceLabel(c.source, locale)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
