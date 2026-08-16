import { type ReactNode, useEffect, useId, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LocaleProvider, useLocale } from "@/components/i18n/LocaleProvider";
import { MainNav } from "@/components/layout/MainNav";
import { DEFAULT_LOCALE } from "@/i18n/locale";

const PAGE_TITLES: { match: RegExp; title: string }[] = [
	{ match: /^\/guides\/walkthrough/, title: "Brick Inc — Walkthrough" },
	{ match: /^\/guides\/resources/, title: "Brick Inc — Resources" },
	{ match: /^\/guides\/features/, title: "Brick Inc — Rank Unlocks" },
	{ match: /^\/conversions/, title: "Brick Inc — Resource Conversions" },
	{ match: /^\/science/, title: "Brick Inc — Science / Quantum" },
	{ match: /^\/presets/, title: "Brick Inc — Presets" },
	{ match: /^\/app/, title: "Brick Inc — App" },
];

function activeFromPath(pathname: string): string {
	if (pathname.startsWith("/guides/walkthrough")) return "guides-walkthrough";
	if (pathname.startsWith("/guides/resources")) return "guides-resources";
	if (pathname.startsWith("/guides/features")) return "guides-features";
	if (pathname.startsWith("/conversions")) return "conversions";
	if (pathname.startsWith("/science")) return "science";
	if (pathname.startsWith("/presets")) return "presets";
	if (pathname.startsWith("/app")) return "app";
	if (pathname.startsWith("/guides")) return "guides";
	return "";
}

function useDocumentTitle(pathname: string) {
	useEffect(() => {
		const hit = PAGE_TITLES.find((t) => t.match.test(pathname));
		document.title = hit?.title ?? "Brick Inc — Idle Breaker Tools";
	}, [pathname]);
}

export function AppShell() {
	return (
		<LocaleProvider initialLocale={DEFAULT_LOCALE}>
			<ShellInner>
				<Outlet />
			</ShellInner>
		</LocaleProvider>
	);
}

function ShellInner({ children }: { children: ReactNode }) {
	const { ui } = useLocale();
	const { pathname } = useLocation();
	const active = activeFromPath(pathname);
	const [open, setOpen] = useState(false);
	const navId = useId();

	useDocumentTitle(pathname);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<div className="flex min-h-[100dvh] flex-col bg-background font-sans text-foreground lg:flex-row">
			<a
				href="#contenido"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-primary-foreground"
			>
				{ui.skip}
			</a>

			<header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
				<div className="flex items-center gap-2 font-mono text-base font-bold tracking-tighter">
					<span aria-hidden="true" className="size-3.5 rounded-sm bg-primary" />
					BRICK.INC
				</div>
				<button
					type="button"
					aria-expanded={open}
					aria-controls={navId}
					onClick={() => setOpen((v) => !v)}
					className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-border font-mono text-[10px] tracking-widest text-foreground hover:border-primary/50"
				>
					{open ? ui.menuClose : ui.menu}
				</button>
			</header>

			{open && (
				<button
					type="button"
					aria-label={ui.menuClose}
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={close}
				/>
			)}

			<aside
				id={navId}
				className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-background transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="hidden border-b border-border p-6 lg:block">
					<div className="flex items-center gap-2 font-mono text-lg font-bold tracking-tighter">
						<span aria-hidden="true" className="size-4 rounded-sm bg-primary" />
						BRICK.INC
						<span className="font-normal text-[10px] text-muted-foreground">v2.3.9</span>
					</div>
					<p className="mt-2 text-xs text-muted-foreground">Idle Breaker tools</p>
				</div>
				<div className="border-b border-border p-4 lg:hidden">
					<div className="flex items-center gap-2 font-mono text-lg font-bold tracking-tighter">
						<span aria-hidden="true" className="size-4 rounded-sm bg-primary" />
						BRICK.INC
						<span className="font-normal text-[10px] text-muted-foreground">v2.3.9</span>
					</div>
				</div>
				<MainNav active={active} onNavigate={close} />
			</aside>

			<main id="contenido" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
				{children}
			</main>
		</div>
	);
}
