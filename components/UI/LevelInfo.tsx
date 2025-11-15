import Image from 'next/image';

interface LevelProps {
	source: any,
	text: string
}

export default function LevelInfo() {
	return (
		<div className="w-[90%] my-4 mx-auto flex flex-col gap-2">
		<div className="w-full flex justify-between items-center ">
			<h1 className="text-sub">Rookie Bartender</h1>
			<h1 className="text-sub">Senior Bartender</h1>
		</div>
			
			<div className="w-full h-6 bg-[#aaa] rounded-lg">
				<div className="w-[80%] h-full bg-white rounded-lg" />
			</div>
				
		<div className="w-full flex justify-between items-center ">
			<h1 className="text-sub">300XP</h1>
			<h1 className="text-sub">100XP to level up</h1>
		</div>

    <div className="w-full h-6 bg-[#aaa] rounded-lg">
		  <div className="w-[80%] h-full bg-white rounded-lg"/>
		</div>
			
		</div>
	)
}