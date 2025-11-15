interface HeaderProps {
	name: string,
	rank: string,
	level: number
}

export default function Header({ name, rank, level }: HeaderProps) {
	return (
		<div className="w-full h-26 px-4 flex justify-between items-center">
		  <div className="flex flex-col gap-1">
			  <h1 className="text-title font-bold">{name}</h1>
				<h2 className="text-sub text-accent">{rank}</h2>
			</div>
			<h1 className="text-mid">{level}</h1>
		</div>
	)
}