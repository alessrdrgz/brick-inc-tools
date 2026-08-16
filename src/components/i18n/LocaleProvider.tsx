import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locale";
import { t, type UiDict } from "@/i18n/ui";

type LocaleContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	ui: UiDict;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
	children,
	initialLocale = DEFAULT_LOCALE,
}: {
	children: ReactNode;
	initialLocale?: Locale;
}) {
	const [locale] = useState<Locale>(initialLocale);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = useCallback((_next: Locale) => {
		/* Language switcher disabled for now; site is English-only. */
	}, []);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			ui: t(locale),
		}),
		[locale, setLocale],
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
	const ctx = useContext(LocaleContext);
	if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
	return ctx;
}
