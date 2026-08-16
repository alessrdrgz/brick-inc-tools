const ICON_BASE = "/assets/icons";

export function GameIcon({
	src,
	className = "size-5",
	alt = "",
}: {
	src: string;
	className?: string;
	alt?: string;
}) {
	const file = src.includes("/") ? src.split("/").pop()! : src;
	return (
		<img
			src={`${ICON_BASE}/${file}`}
			alt={alt}
			className={`inline-block shrink-0 object-contain ${className}`}
			draggable={false}
			loading="lazy"
		/>
	);
}
