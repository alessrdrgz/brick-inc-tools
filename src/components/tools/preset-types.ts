export type StatWeightMap = Record<string, number>;

export type PresetDef = {
	name: string;
	statWeights: StatWeightMap;
	relevantRange: { min: number; max: number };
	maximumSeeds: number;
};

export type NodeStat = { type: string; value: number };

export type TruthNode = {
	id: string;
	neighborIds: string[];
	stats: NodeStat[];
	rarity: string;
};

export type StatType = {
	type: string;
	imgSrc: string;
	unitValue: number;
	unit: string;
};
