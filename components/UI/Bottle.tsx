"use client"
export default function Bottle({ caption, color }: {caption: string, color: string}) {
	return (
		<div className="w-full h-full -z-1">
			<div className="w-[40%] h-[30%] mx-auto rounded-[10%_10%_0%_0%]"
			style={{ backgroundColor: color }}/>
		  <div className="w-full h-[71%] -translate-y-[1%] rounded-[30%_30%_0%_0%]"
			style={{ backgroundColor: color }}/>
		</div>
	)
}