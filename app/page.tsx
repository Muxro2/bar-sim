"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

import Bottle from '@/components/UI/Bottle'
import Tin from '@/components/UI/Tin'
import IceBucket from '@/components/UI/IceBucket'


import { drinks, ingredientColors } from '@/lib/drinks'

export default function Challenge() {
	const [drink, setDrink] = useState(drinks[0])

	const [phase, setPhase] = useState("ingredients")
	const [addedIngredients, setAddedIngredients] = useState<string[]>([])
	const [addedIce, setAddedIce] = useState(false)
	const [isMixed, setIsMixed] = useState(false)

	{/* Functions */}
  function handleAddIngredient(ingName: string) {
		if (!addedIngredients.includes(ingName)) {
		setAddedIngredients([...addedIngredients, ingName])
		}
	}

	function handleAddIce() {
		if (addedIngredients.length == drink.ingredients.length) {
	  	setAddedIce(true)
		}
	}

  function handleShake() {
	  	setIsMixed(true)
	}
	
	return (
		<div className="w-full h-[100dvh] flex flex-col overflow-hidden">

		  {/* Background */}
		  <div className="w-full h-[55%] bg-[#110101]">

				{/* Glass Rack */}
				<div className="w-full h-[30%] -translate-y-[5%] flex justify-center gap-[1%]">
				{Array.from({ length: 4 }, (_, i) => (
			    <Image
					key={i}
					src="/bar-sim/coupe.svg"
					alt="Glass"
					width={0}
					height={0}
					className="w-[24%] h-full rotate-180"
				  />
				))}
				</div>

				{/* Shelves */}
				<div className=" w-[80%] h-2 mx-auto mt-12 bg-[#210101]"></div>
				<div className=" w-[70%] h-2 mx-auto mt-15 bg-[#210101]"></div>
				
			</div>

			
			{/* Bar Top */}
			<div className="relative w-full h-[10%] pb-[5%] bg-[#310101] flex justify-center items-end">
				{/* Tin */}
				<Tin addedIngredients={addedIngredients} addedIce={addedIce} isMixed={isMixed}/>

				{!isMixed &&
				/* Tin Top */
				<motion.button 
					className="absolute w-[20%] aspect-3/4 bg-neutral-400 clip-tin"
					onClick={() => handleShake()}
					initial={{ right: '-20%' }}
					animate={addedIce ? { right: '10%' } : {}}
					transition={{ duration: 1 }}
					/>
				}
			</div>

			{/* Bar Interface */}
			<div className="relative w-full flex-1 px-[5%] flex justify-between items-end">
				{/* Speed Rail */}
			  <div className="relative w-[60%] h-[80%] flex gap-[1%]">
					
					{/* Bottles */}
					{drink.ingredients.map( (ing, i) => (
			      <button key={i} className="w-[23%] h-[70%]" onClick={() => handleAddIngredient(ing.name)}>
			      <Bottle caption="" color={ingredientColors[ing.name]}/>
						</button>
					))}

					<div className="absolute w-full h-[30%] bottom-[5%] bg-[#310101] rounded-[0%_0%_10px_10px] flex" />
					
				</div>
				
				{/* Ice Bucket */}
				<button className="w-[35%] h-[80%]" onClick={() => handleAddIce()}>
				  <IceBucket />
				</button>

				
			</div>
			
		</div>
	)
}