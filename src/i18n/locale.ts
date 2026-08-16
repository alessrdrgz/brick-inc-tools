export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["es", "en"];
export const LOCALE_STORAGE_KEY = "locale";
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | null | undefined): value is Locale {
	return value === "es" || value === "en";
}

export function getCookieLocale(cookieHeader: string | null): Locale | null {
	if (!cookieHeader) return null;
	const match = cookieHeader.match(/(?:^|;\s*)locale=(es|en)(?:;|$)/);
	return match?.[1] && isLocale(match[1]) ? match[1] : null;
}

export function setLocale(locale: Locale): void {
	if (typeof document === "undefined") return;
	localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
	document.documentElement.lang = locale;
}

export function getStoredLocale(): Locale {
	if (typeof document === "undefined") return DEFAULT_LOCALE;
	const fromStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
	if (isLocale(fromStorage)) return fromStorage;
	const fromCookie = getCookieLocale(document.cookie);
	if (fromCookie) return fromCookie;
	return DEFAULT_LOCALE;
}
