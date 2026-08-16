/** Game number notation: K M B T a..z aa.. */

export function parseGameNumber(input: string): number {
	const A = input.trim();
	if (!A) return Number.NaN;
	if (/^(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?$/.test(A)) {
		return Number.parseFloat(A);
	}
	if (/^[0-9]+\.?[0-9]*[KMBTa-z]+$/.test(A)) {
		const n = Number.parseFloat(A.substring(0, A.search(/[KMBTa-z]+/)));
		const o = A.substring(A.search(/[KMBTa-z]+/));
		let r: number;
		switch (o) {
			case "K":
				r = 1e3;
				break;
			case "M":
				r = 1e6;
				break;
			case "B":
				r = 1e9;
				break;
			case "T":
				r = 1e12;
				break;
			default: {
				r = 1e12;
				let Q = 0;
				for (const m of o) {
					if (Q !== 0) Q *= 26;
					Q += m.charCodeAt(0) - 96;
				}
				r *= 10 ** (3 * Q);
			}
		}
		return n * r;
	}
	return Number.NaN;
}

export function formatGameNumber(n: number): string {
	if (!Number.isFinite(n)) return "—";
	if (Math.abs(n) < 1000) return String(Math.round(n * 1000) / 1000);
	return n.toExponential(3);
}

export type ScienceRecommendation = "spend" | "upgrade" | "rankup" | "invalid" | "empty";

export function getScienceRecommendation(params: {
	productionPerSecond: number;
	rank: number;
	rankUpCost: number;
	upgradeCost: number;
	science: boolean;
}): ScienceRecommendation {
	const { productionPerSecond, rank, rankUpCost, upgradeCost, science } = params;
	if (productionPerSecond === 0 || rank === 0 || rankUpCost === 0 || upgradeCost === 0) {
		return "empty";
	}
	if (
		!(
			Number.isFinite(productionPerSecond) &&
			Number.isFinite(rank) &&
			Number.isFinite(rankUpCost) &&
			Number.isFinite(upgradeCost)
		)
	) {
		return "invalid";
	}

	const hourly = 60 * productionPerSecond * 60;
	if (science) {
		if (upgradeCost > 12 * hourly) return "spend";
		if ((rankUpCost / upgradeCost) * (rank / 20) >= 1) return "upgrade";
		return "rankup";
	}

	if (upgradeCost > 12 * hourly) return "spend";
	const n = 0.05 / upgradeCost;
	const o = ((rank + 10) / (rank + 9) - 1) / rankUpCost;
	return n >= o ? "upgrade" : "rankup";
}
