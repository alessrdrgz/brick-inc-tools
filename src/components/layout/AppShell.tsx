import { type ReactNode, useEffect, useId, useState } from "react";
import { LocaleProvider, useLocale } from "@/components/i18n/LocaleProvider";
import { MainNav } from "@/components/layout/MainNav";
import type { Locale } from "@/i18n/locale";

export function AppShell({
	children,
	initialLocale,
	active,
}: {
	children: ReactNode;
	initialLocale: Locale;
	active: string;
}) {
	return (
		<LocaleProvider initialLocale={initialLocale}>
			<ShellInner active={active}>{children}</ShellInner>
		</LocaleProvider>
	);
}

function ShellInner({ children, active }: { children: ReactNode; active: string }) {
	const { ui } = useLocale();
	const [open, setOpen] = useState(false);
	const navId = useId();

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
