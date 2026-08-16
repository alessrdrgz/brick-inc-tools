import { useMemo } from "react";
import type { TruthNode } from "@/components/tools/preset-types";

const RARITY_BG: Record<string, string> = {
	common: "/assets/rarity/common.png",
	rare: "/assets/rarity/rare.png",
	epic: "/assets/rarity/epic.png",
	legendary: "/assets/rarity/legendary.png",
};

type StatType = { type: string; imgSrc: string };

export function BoardNode({
	node,
	selected,
	statImgByType,
	onToggle,
}: {
	node: TruthNode;
	selected: boolean;
	statImgByType: Map<string, string>;
	onToggle: () => void;
}) {
	const bg = RARITY_BG[node.rarity];
	const stats = node.stats.slice(0, 4);
	const multi = stats.length > 1;

	const title = useMemo(() => {
		if (node.id === "0") return "Center";
		return [
			node.id,
			...node.stats.map((s) => `${s.type} ${s.value > 0 ? "+" : ""}${s.value}`),
		].join("\n");
	}, [node]);

	return (
		<button
			type="button"
			title={title}
			aria-pressed={selected}
			onClick={onToggle}
			className={`relative flex size-[50px] shrink-0 items-center justify-center overflow-hidden border-0 bg-center bg-no-repeat p-0 ${
				selected ? "" : "brightness-[0.3]"
			}`}
			style={{
				backgroundImage: bg ? `url(${bg})` : undefined,
				backgroundSize: "50px 50px",
				backgroundColor: bg ? undefined : "#0a1f14",
			}}
		>
			{stats.length === 0 ? (
				<span className="font-mono text-[9px] text-emerald-200/80">0</span>
			) : multi ? (
				<div className="flex size-[50px] flex-col justify-center">
					<div className="flex h-[22px] items-center justify-center pt-[3px]">
						{stats.slice(0, 2).map((s) => (
							<img
								key={`${node.id}-${s.type}-t`}
								src={`/assets/icons/${statImgByType.get(s.type) ?? "ui_bo_power.png"}`}
								alt=""
								width={20}
								height={20}
								className="size-5"
								draggable={false}
							/>
						))}
					</div>
					{stats.length > 2 && (
						<div className="flex h-[22px] items-center justify-center">
							{stats.slice(2, 4).map((s) => (
								<img
									key={`${node.id}-${s.type}-b`}
									src={`/assets/icons/${statImgByType.get(s.type) ?? "ui_bo_power.png"}`}
									alt=""
									width={20}
									height={20}
									className="size-5"
									draggable={false}
								/>
							))}
						</div>
					)}
				</div>
			) : (
				<img
					src={`/assets/icons/${statImgByType.get(stats[0]!.type) ?? "ui_bo_power.png"}`}
					alt=""
					width={20}
					height={20}
					className="size-5"
					draggable={false}
				/>
			)}
		</button>
	);
}

function HLine() {
	return (
		<div className="flex h-[50px] w-5 shrink-0 items-center">
			<div className="h-[5px] w-full bg-[#2c592a]" />
		</div>
	);
}

function VLine() {
	return (
		<div className="flex h-5 w-[50px] shrink-0 items-center justify-center">
			<div className="h-[5px] w-5 rotate-90 bg-[#2c592a]" />
		</div>
	);
}

export function TruthBoard({
	grid,
	buildMap,
	statTypes,
	onToggle,
	scale = 1,
}: {
	grid: TruthNode[][];
	buildMap: Map<string, boolean>;
	statTypes: StatType[];
	onToggle: (id: string) => void;
	scale?: number;
}) {
	const statImgByType = useMemo(
		() => new Map(statTypes.map((s) => [s.type, s.imgSrc])),
		[statTypes],
	);

	return (
		<div className="overflow-auto rounded-lg border border-border overscroll-contain touch-pan-x touch-pan-y">
			<div
				className="inline-block min-w-max origin-top-left bg-[#123625] p-2"
				style={{ transform: `scale(${scale})` }}
			>
				{grid.map((row, rowIdx) => (
					<div key={`row-${rowIdx}`}>
						<div className="flex">
							{row.map((node, colIdx) => (
								<div key={node.id} className="flex">
									<BoardNode
										node={node}
										selected={!!buildMap.get(node.id)}
										statImgByType={statImgByType}
										onToggle={() => onToggle(node.id)}
									/>
									{colIdx < row.length - 1 && <HLine />}
								</div>
							))}
						</div>
						{rowIdx < grid.length - 1 && (
							<div className="flex">
								{row.map((node, colIdx) => (
									<div key={`v-${node.id}`} className="flex">
										<VLine />
										{colIdx < row.length - 1 && <div className="w-5 shrink-0" />}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
