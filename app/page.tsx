"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

import Person from '@/components/UI/Person'
import Person2 from '@/components/UI/Person2'

import Bottle from '@/components/UI/Bottle'
import Tin from '@/components/UI/Tin'
import IceBucket from '@/components/UI/IceBucket'
import Glass from '@/components/UI/Glass'
import CustomConsole from '@/components/Development/CustomConsole'



import { drinks, ingredientColors } from '@/lib/drinks'

import { Ingredient } from '@/types/drinkTypes'

export default function Challenge() {
	const [drink, setDrink] = useState(drinks[0])
	const [phase, setPhase] = useState("ingredients")
	const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([])
	const [addedIce, setAddedIce] = useState(false)
	const [isMixed, setIsMixed] = useState(false)
	const [isHolding, setIsHolding] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)
  const [tinReset, setTinReset] = useState(false)
  const [fillGlass, setFillGlass] = useState(false)
	
  const shakeInterval = useRef<NodeJS.Timeout | null>(null)
	
	{/* Functions */}
  useEffect(() => {
		if (shakeCount == 10) { // change shake time here
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
		const drinkIngredient = drink.ingredients.find(ing => ing.name === ingName);

		if (!drinkIngredient) return;

		const existing = addedIngredients.find(ing => ing.name === ingName);

		let updatedIngredients: Ingredient[];

		if (existing) {
			const newAmount = existing.amount + 25;

			if (newAmount > drinkIngredient.amount) {
				return;
			}

			updatedIngredients = addedIngredients.map(ing =>
				ing.name === ingName ? { ...ing, amount: newAmount } : ing
			);
			
		} else {
			
			
			if (drinkIngredient.amount < 25) {
				return;
			}

			updatedIngredients = [...addedIngredients, { name: ingName, amount: 25 }];
		}

		setAddedIngredients(updatedIngredients);

		// Check if all ingredients have at least the required amount
		const allComplete = drink.ingredients.every(ing =>
			updatedIngredients.some(ai => ai.name === ing.name && ai.amount >= ing.amount)
		);

		if (allComplete) {
			setPhase("ice");
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
		, 750)
	}

  function handleShakeEnd() {
		setIsHolding(false)

		if (shakeInterval.current) {
			clearTimeout(shakeInterval.current)
			shakeInterval.current = null
		}
	}

	function handleFill() {
		setFillGlass(true)
	}
	
	return (
		<div className="w-full h-[100dvh] flex flex-col overflow-hidden">

			<CustomConsole open={false}>
			{addedIngredients.map((ing) => (
			ing.name + ":" + ing.amount + ";  "
			))}
			</CustomConsole>
			
		  {/* Background */}
		  <div className="relative w-full h-[55%] bg-[#110101]">

				{/* Glass Rack */}
				<div className="w-full h-[30%] -translate-y-[5%] flex justify-center gap-[1%]">
				{Array.from({ length: 4 }, (_, i) => (
			    <Image
					key={i}
					src="/bar-sim/bgCoupe.svg"
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

        {/* Person */}
        <Person />
				<Person2 />
			</div>

			
			{/* Bar Top */}
			<motion.div className="relative w-full h-[10%] pb-[5%] bg-[#310101] flex justify-center items-end gap-[10%]">

				{phase=="glass" && tinReset &&
				/* Glass */
			  <motion.button className="absolute"
					initial={{ left: "-100%"}}
					animate={fillGlass ? { left: "40%" } : { left: "20%" }}
					onClick={() => handleFill()}>
        <Glass >
					{fillGlass && 
					<div className="absolute bottom-0 top-[6%] w-full bg-[#DDDD88]" >
						
					</div>
					}
				</Glass>
				</motion.button>
				}
				
				{true &&
					/* Tin */
				<Tin phase={phase} isHolding={isHolding} addedIngredients={addedIngredients} addedIce={addedIce} isMixed={isMixed} fillGlass={fillGlass} setTinReset={setTinReset}/>
					}
					
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
			</motion.div>

			{/* Bar Interface */}
			<div className="relative w-full flex-1 px-[5%] flex justify-between items-end">

				{!(phase=="shake") ? 
				<>
					{/* Speed Rail */}
			  <div className="relative w-[60%] h-[80%] flex gap-[1%]">
					
					{/* Bottles */}
					{drink.ingredients.map( (ing, i) => (
			      <button key={i} className="w-[23%] h-[70%]" onClick={() => handleAddIngredient(ing.name)}>
			      <Bottle caption={drink.ingredients[i].name} color={ingredientColors[ing.name]}/>
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

			<button className="w-full h-full "
				style={{ 
				userSelect: "none",
				WebkitUserSelect: "none",
				fontSize: `${isHolding ? 24+(shakeCount*6) : 24 }px`
				}}
				onTouchStart={() => handleShakeStart()}
				onTouchEnd={() => handleShakeEnd()}
				>

			{isHolding ? `${shakeCount}` : "Hold to shake"}
			</button>
			
			}
			</div>
		
		</div>
	)
}