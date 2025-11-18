"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

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
	const [isHolding, setIsHolding] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)

  const shakeInterval = useRef<NodeJS.Timeout | null>(null)
	
	{/* Functions */}
  useEffect(() => {
		if (shakeCount == 3) {
			setIsHolding(false)

			if (shakeInterval.current) {
				clearInterval(shakeInterval.current)  
				shakeInterval.current = null
			}
			
			setIsMixed(true)
			setPhase("glass")
		}
		
	}, [shakeCount])
	
  function handleAddIngredient(ingName: string) {
		if (!addedIngredients.includes(ingName)) {
			const updatedIngredients = [...addedIngredients, ingName]
		  setAddedIngredients(updatedIngredients)
			if (updatedIngredients.length == drink.ingredients.length) {
					setPhase("ice")
			}
		} 
	}

	function handleAddIce() {
		if (phase == "ice") {
			setAddedIce(true)
		}
	}

  function handleClose() {
		setPhase("shake")
	}

	function handleShakeStart() {
		setIsHolding(true)

		if (shakeInterval.current) return 
		
		shakeInterval.current = setInterval(() => {
			setShakeCount((prev) => {
				return prev+1
			})
		}
		, 1000)
	}

  function handleShakeEnd() {
		setIsHolding(false)

		if (shakeInterval.current) {
			clearTimeout(shakeInterval.current)
			shakeInterval.current = null
		}
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
				<Tin phase={phase} isHolding={isHolding} addedIngredients={addedIngredients} addedIce={addedIce} isMixed={isMixed}/>

				{addedIce && (phase=="ice") &&
				/* Tin Top */
				<motion.button 
					className="absolute w-[20%] aspect-3/4 bg-neutral-400 clip-tin"
					onClick={() => handleClose()}
					initial={{ right: '-20%' }}
					animate={addedIce ? { right: '10%' } : {}}
					transition={{ duration: 1 }}
					/>
				}
			</div>

			{/* Bar Interface */}
			<div className="relative w-full flex-1 px-[5%] flex justify-between items-end">

				{!(phase=="shake") ? 
				<>
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
				</>
			:

			<button className="w-full h-full"
				style={{ 
				userSelect: "none",
				WebkitUserSelect: "none",
				}}
				onTouchStart={() => handleShakeStart()}
				onTouchEnd={() => handleShakeEnd()}
				>

			Hold to shake. {shakeCount}
			</button>
			
			}
			</div>
		
		</div>
	)
}