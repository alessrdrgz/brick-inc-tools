import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { GameIcon } from "@/components/icons/GameIcon";
import type { GuideNode, GuideSection } from "@/data/guides";

function GuideAccordion({
	node,
	depth = 0,
	defaultOpen = false,
}: {
	node: GuideNode;
	depth?: number;
	defaultOpen?: boolean;
}) {
	const { ui } = useLocale();
	const [open, setOpen] = useState(defaultOpen || depth === 0);
	const hasBody = Boolean(node.children?.length || node.items?.length);
	const panelId = `guide-${node.id}`;

	return (
		<section
			className={`overflow-hidden rounded-lg border transition-colors ${
				open ? "border-primary/25 bg-card" : "border-border bg-card/40"
			}`}
		>
			{hasBody ? (
				<h3 className={depth === 0 ? "contents" : undefined}>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls={panelId}
						className="flex min-h-11 w-full items-center justify-between gap-3 p-3 text-left transition-colors hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:p-4"
					>
						<span className="flex min-w-0 items-center gap-3">
							{node.icon && <GameIcon src={node.icon} className="size-6" />}
							<span
								className={`font-mono tracking-tight text-foreground ${
									depth === 0
										? "text-sm font-bold uppercase"
										: depth === 1
											? "text-sm font-semibold"
											: "text-xs font-medium"
								}`}
							>
								{node.title}
							</span>
						</span>
						<span className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
							{open ? ui.close : ui.open}
						</span>
					</button>
				</h3>
			) : (
				<div className="flex min-h-11 items-center gap-3 p-3 sm:p-4">
					{node.icon && <GameIcon src={node.icon} className="size-6" />}
					<span className="font-mono text-sm text-foreground">{node.title}</span>
				</div>
			)}

			{open && hasBody && (
				<div id={panelId} className="space-y-2 border-t border-border p-3 sm:p-4">
					{node.items?.map((item) => (
						<div
							key={item.text}
							className="flex gap-3 rounded border border-border bg-background/40 px-3 py-2.5 text-sm text-foreground/85"
						>
							{item.icon ? (
								<GameIcon src={item.icon} className="mt-0.5 size-5" />
							) : (
								<span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-sm bg-primary" />
							)}
							<span>{item.text}</span>
						</div>
					))}
					{node.children?.map((child) => (
						<GuideAccordion key={child.id} node={child} depth={depth + 1} />
					))}
				</div>
			)}
		</section>
	);
}

export function GuidePage({
	contentByLocale,
}: {
	contentByLocale: { es: GuideSection; en: GuideSection };
}) {
	const { locale } = useLocale();
	const content = contentByLocale[locale];

	return (
		<div className="panel-snap max-w-3xl space-y-4">
			<header>
				<h1 className="font-mono text-2xl font-bold tracking-tight">{content.title}</h1>
			</header>
			{content.groups.map((group) => (
				<GuideAccordion key={group.id} node={group} depth={0} defaultOpen />
			))}
		</div>
	);
}
