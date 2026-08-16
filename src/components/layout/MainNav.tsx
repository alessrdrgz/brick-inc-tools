import { Link } from "react-router-dom";
import { useLocale } from "@/components/i18n/LocaleProvider";

const DISCORD = "https://discord.gg/9unNkHAvZV";

const links = [
	{ id: "guides", href: "/guides/walkthrough" },
	{ id: "conversions", href: "/conversions" },
	{ id: "science", href: "/science" },
	{ id: "presets", href: "/presets" },
] as const;

export function MainNav({ active, onNavigate }: { active: string; onNavigate?: () => void }) {
	const { ui } = useLocale();

	const labels: Record<(typeof links)[number]["id"], string> = {
		guides: ui.nav.guides,
		conversions: ui.nav.conversions,
		science: ui.nav.science,
		presets: ui.nav.presets,
	};

	const linkClass = (isActive: boolean) =>
		`flex items-center gap-3 border-l-2 px-3 py-2.5 font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
			isActive
				? "border-primary bg-primary/10 text-primary"
				: "border-transparent text-muted-foreground hover:bg-primary/5 hover:text-foreground"
		}`;

	return (
		<nav aria-label="Main" className="flex flex-1 flex-col p-4">
			<p className="mb-2 px-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
				Nav
			</p>
			<ul className="space-y-1">
				{links.map((link) => {
					const isActive =
						active === link.id || (link.id === "guides" && active.startsWith("guides"));
					return (
						<li key={link.id}>
							<Link to={link.href} onClick={onNavigate} className={linkClass(isActive)}>
								{labels[link.id]}
							</Link>
							{link.id === "guides" && (
								<ul className="mt-1 mb-2 ml-3 space-y-1 border-l border-border pl-2">
									{(
										[
											["walkthrough", "/guides/walkthrough", ui.guidesSub.walkthrough],
											["resources", "/guides/resources", ui.guidesSub.resources],
											["features", "/guides/features", ui.guidesSub.features],
										] as const
									).map(([id, href, label]) => (
										<li key={id}>
											<Link
												to={href}
												onClick={onNavigate}
												className={linkClass(active === `guides-${id}`)}
											>
												{label}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>

			<div className="mt-auto space-y-3 px-3 pt-8">
				<Link
					to="/app"
					onClick={onNavigate}
					className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
				>
					{ui.nav.app}
				</Link>
				<a
					href={DISCORD}
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
				>
					{ui.discord}
				</a>
			</div>
		</nav>
	);
}
