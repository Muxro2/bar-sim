"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

import BarBack from '@/components/layout/BarBack'

import Bottle from '@/components/bar/Bottle'
import Tin from '@/components/bar/Tin'
import IceBucket from '@/components/bar/IceBucket'
import Glass from '@/components/bar/Glass'
import CustomConsole from '@/components/dev/CustomConsole'

import { barStore } from '@/stores/barStore'

import { drinks, ingredientData } from '@/lib/drinks'

import { Drink, Ingredient } from '@/types/drinkTypes'

export default function Challenge() {
  const BarStore = barStore()
	
	const drink = BarStore.drink
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

  function handleReset() {
		setPhase("ingredients")
		setAddedIngredients([])
		setAddedIce(false)
		setIsMixed(false)
		setIsHolding(false)
		setShakeCount(0)
		setTinReset(false)
		setFillGlass(false)
	}

  function changeDrink(changeTo: string) {
		if (!(changeTo === drink?.id)) {
			handleReset()
			BarStore.setDrink(drinks[drinks.findIndex((drk) => (
				drk.id === changeTo
			))])
		}
	}
	
	return (
		<div className="w-full h-[100dvh] flex flex-col overflow-hidden">

     
			
			<CustomConsole open={false}>
			</CustomConsole>
			
			<BarBack />

			<div className="absolute w-full h-10 flex justify-between">
			<button className=""
				onClick={() => handleReset()}>
				reset
			</button>
			<button className=""
				onClick={() => changeDrink("margarita")}>
				Margarita
			</button>
			<button className=""
				onClick={() => changeDrink("daiquiri")}>
				Daquiri
			</button>
							<button className=""
				onClick={() => changeDrink("sidecar")}>
				Sidecar
			</button>
		</div>
			
			{/* Bar Top */}
			<motion.div className="relative w-full h-[10%] pb-[10%] bg-[#310101] flex justify-center items-end gap-[10%]">

				{phase=="glass" && tinReset &&
				/* Glass */
			  <motion.button className="absolute"
					initial={{ left: "-100%"}}
					animate={fillGlass ? { left: "40%" } : { left: "20%" }}
					onClick={() => handleFill()}>
        <Glass >
					{fillGlass && 
					<div className="absolute bottom-0 top-[6%] w-full"
						style={{
							backgroundColor: drink.color
						}}>
						
					</div>
					}
				</Glass>
				</motion.button>
				}
				
				{true &&
					/* Tin */
				<Tin drink={drink} phase={phase} isHolding={isHolding} addedIngredients={addedIngredients} addedIce={addedIce} isMixed={isMixed} fillGlass={fillGlass} setTinReset={setTinReset}/>
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
					{drink?.ingredients.map( (ing, i) => (
			      <button key={i} className="w-[23%] h-[70%]" onClick={() => handleAddIngredient(ing.name)}>
			      <Bottle caption={drink.ingredients[i].name}/>
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