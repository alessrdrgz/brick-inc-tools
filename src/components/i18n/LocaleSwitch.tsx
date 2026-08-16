import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/i18n/locale";

export function LocaleSwitch() {
	const { locale, setLocale, ui } = useLocale();

	const btn = (code: Locale, label: string) => (
		<button
			type="button"
			onClick={() => setLocale(code)}
			aria-pressed={locale === code}
			className={`rounded border px-2 py-1 font-mono text-[10px] tracking-widest transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
				locale === code
					? "border-primary bg-primary/15 text-primary"
					: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
			}`}
		>
			{label}
		</button>
	);

	return (
		<div className="flex gap-1" role="group" aria-label="Language">
			{btn("es", ui.langEs)}
			{btn("en", ui.langEn)}
		</div>
	);
}
