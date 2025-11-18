"use client"
export default function Bottle({ caption, color }: {caption: string, color: string}) {
	const bottleHeights: Record<string, string> = {
		"Tequila": "60%",
		"Triple Sec": "50%",
		"Lime Juice": "71%"
	}
	
	return (
		<div className="w-full h-full -z-1 flex flex-col justify-end">
			<div className="w-[40%] h-[30%] mx-auto rounded-[10%_10%_0%_0%] border-1 border-black/20"
			style={{ backgroundColor: color }}/>
		  <div className="w-full -translate-y-[1%] rounded-[30%_30%_0%_0%] flex items-center overflow-hidden border-1 border-black/30"
			style={{ height: bottleHeights[caption], backgroundColor: color }}>
      <h1 className="-rotate-30 text-xl font-bold text-black/30">{caption}</h1>
			</div>
		</div>
	)
}