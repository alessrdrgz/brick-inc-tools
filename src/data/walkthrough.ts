import type { Step, StepId } from "@/data/types";
import { steps as stepsEn } from "@/data/walkthrough-en";
import { steps as stepsEs } from "@/data/walkthrough-es";
import type { Locale } from "@/i18n/locale";

export function getWalkthrough(locale: Locale): Step[] {
	return locale === "en" ? stepsEn : stepsEs;
}

export function getStep(locale: Locale, id: StepId): Step | undefined {
	return getWalkthrough(locale).find((s) => s.id === id);
}
