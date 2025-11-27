"use client"

import { ingredientData } from '@/lib/drinks'

export default function Bottle({ caption }: {caption: string}) {
	const height = ingredientData.find((ing) => ing.name === caption)?.bottleHeight
	const color = ingredientData.find((ing) => ing.name === caption)?.color
	
	return (
		<div className="relative w-full h-full flex flex-col">
			<div className="w-[4vw] h-[5vh] mx-auto translate-y-[1vh]"
			style={{ backgroundColor: color }}/>
			
		  <div className="relative w-full h-full rounded-[30px_30px_0%_0%] flex justify-end items-end overflow-hidden"
			style={{ backgroundColor: color }}>
			<div className='absolute inset-1 rounded-[30px_30px_0_0] bg-white'/>
			<div className='absolute inset-1 right-2 rounded-[30px_30px_0%_0%]'
				style={{ backgroundColor: color }}/>

      <h1 className="absolute bottom-0 left-[50%] -rotate-90 origin-left text-md text-left font-roboto leading-[1em] text-black/30 z-10">{caption}</h1>
				</div>
				
		</div>
	)
}