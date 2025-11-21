import Image from 'next/image';

// interface ButtonProps {
// 	icon: any,
// 	title: string,
// 	description: string,
// 	info?: string
// }

export default function Card({children}
	:
	Readonly<{children: React.ReactNode}>) {


	return (
		<div
			className="flex-1 p-5 rounded-xl border-1 border-white/20 flex items-center gap-4"
			>
			<div className="flex flex-col items-start">
				<h1 className="pb-2 text-[16px] font-bold">On The Rocks</h1>
				
				<div className="w-full pb-2 flex items-center gap-2">
				<h1 className="text-[20px]">🥃</h1>
				<h1 className="text-[14px] leading-4">Whiskey cocktails</h1>
				</div>
				
				<h1 className="pb-2 text-[16px] font-bold">+50XP</h1>
				<div className="w-full flex flex-col gap-2">
					{children}
				</div>
		
			</div>
		</div>
	)
}