"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

import BarBack from '@/components/layout/BarBack'

import GlassButton from '@/components/ui/GlassButton'

import Bottle from '@/components/bar/Bottle'
import Tin from '@/components/bar/Tin'
import Jug from '@/components/bar/Jug'
import IceBucket from '@/components/bar/IceBucket'
import Glass from '@/components/bar/Glass'
import CustomConsole from '@/components/dev/CustomConsole'

import { barStore } from '@/stores/barStore'

import { drinks, ingredientData } from '@/lib/drinks'

import { Drink, Ingredient } from '@/types/drinkTypes'

export default function Challenge() {
  const BarStore = barStore()
	
  const shakeInterval = useRef<NodeJS.Timeout | null>(null)
	
	{/* Functions */}
  useEffect(() => {
		if (BarStore.shakeCount == 8) { // change shake time here
			BarStore.setIsHolding(false)

			if (shakeInterval.current) {
				clearInterval(shakeInterval.current)  
				shakeInterval.current = null
			}
			
			BarStore.setIsMixed(true)
			BarStore.setPhase("glass")
		}
		
	}, [BarStore.shakeCount])
	
	function handleAddIngredient(ingName: string) {
		const drinkIngredient = BarStore.drink.ingredients.find(ing => ing.name === ingName);

		if (!drinkIngredient) return;

		const existing = BarStore.addedIngredients.find(ing => ing.name === ingName);

		let updatedIngredients: Ingredient[];

		if (existing) {
			const newAmount = existing.amount + 25;

			if (newAmount > drinkIngredient.amount) {
				return;
			}

			updatedIngredients = BarStore.addedIngredients.map(ing =>
				ing.name === ingName ? { ...ing, amount: newAmount } : ing
			);

			
		} else {
			
			
			if (drinkIngredient.amount < 25) {
				return;
			}

			updatedIngredients = [...BarStore.addedIngredients, { name: ingName, amount: 25 }];
		}

		BarStore.setAddedIngredients(updatedIngredients);

		// Check if all ingredients have at least the required amount
		const allComplete = BarStore.drink.ingredients.every(ing =>
			updatedIngredients.some(ai => ai.name === ing.name && ai.amount >= ing.amount)
		);

		if (allComplete) {
			BarStore.setPhase("ice");
		}
	}

	function handleAddIce() {
		if (BarStore.phase == "ice") {
			BarStore.setAddedIce(true)
		}
	}

  function handleClose() {
		BarStore.setPhase("shake")
	}

	function handleShakeStart() {
		BarStore.setIsHolding(true)

		if (shakeInterval.current) return 
		
		shakeInterval.current = setInterval(() => {
			BarStore.incrementShakeCount()
		}
		, 750)
	}

  function handleShakeEnd() {
		BarStore.setIsHolding(false)

		if (shakeInterval.current) {
			clearTimeout(shakeInterval.current)
			shakeInterval.current = null
		}
	}

	function handleFill() {
		BarStore.setFillGlass(true)
	}

  function handleReset() {
		BarStore.setToggleResetDrink(true)
		BarStore.setPhase("ingredients")
		BarStore.setAddedIngredients([])
		BarStore.setAddedIce(false)
		BarStore.setIsMixed(false)
		BarStore.setIsHolding(false)
		BarStore.resetCount()
		BarStore.setTinReset(false)
		BarStore.setFillGlass(false)
	}

  function changeDrink(changeTo: string) {
		if (!(changeTo === BarStore.drink?.id)) {
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

			<div className="absolute w-full h-[18%] -top-[2%] overflow-scroll no-scrollbar">
			<div className="w-fit h-full px-[2%] flex gap-[2%]">
			<GlassButton text="reset" action={() => handleReset()}/>
			<GlassButton text="margarita" action={() => changeDrink("margarita")}/>
			<GlassButton text="daiquiri" action={() => changeDrink("daiquiri")}/>
			<GlassButton text="pornstar" action={() => changeDrink("pornstarmartini")}/>
			<GlassButton text="negroni" action={() => changeDrink("negroni")}/>
			<GlassButton text="sidecar" action={() => changeDrink("sidecar")}/>
		</div>
			</div>
			
			{/* Bar Top */}
			<motion.div className="relative w-full h-[10%] pb-[10%] bg-[#610101] flex justify-center items-end gap-[10%]">

				{BarStore.phase=="glass" && BarStore.tinReset &&
				/* Glass */
			  <motion.button className="absolute"
					initial={{ left: "-100%"}}
					animate={BarStore.fillGlass ? { left: "40%" } : { left: "20%" }}
					onClick={() => handleFill()}>
        <Glass >
					{BarStore.fillGlass && 
					<div className="absolute bottom-0 top-[6%] w-full"
						style={{
							backgroundColor: BarStore.drink.color
						}}>
						
					</div>
					}
				</Glass>
				</motion.button>
				}
				
				{BarStore.drink.method=="shake" &&
					/* Tin */
				<Tin />
					}
				{BarStore.drink.method=="stir" &&
					/* Jug */
				<Jug />
					}
					
				{BarStore.addedIce && (BarStore.phase=="ice") &&
				/* Tin Top */
				<motion.button 
					className="absolute w-[20%] aspect-3/4 bg-neutral-400 clip-tin"
					onClick={() => handleClose()}
					initial={{ right: '-20%' }}
					animate={BarStore.addedIce ? { right: '10%' } : {}}
					transition={{ duration: 1 }}
					/>
				}
			</motion.div>

			{/* Bar Interface */}
			<div className="relative w-full flex-1 px-[5%] bg-[#410101] flex justify-between items-end">

				{!(BarStore.phase=="shake") ? 
				<>
					{/* Speed Rail */}
				<div className="w-[60%] h-[90%] flex flex-col justify-end">
			  <div className="relative h-[60%] flex items-end gap-[1%]">
					
					{/* Bottles */}
					{BarStore.drink?.ingredients.map( (ing, index) => (
			      <button key={index} className="w-[23%]"
							style={BarStore.addedIngredients.find((i) => i.name === ing.name)?.amount === BarStore.drink.ingredients.find((i)=>i.name===ing.name)?.amount
							? { height: "50%"}
							: { height: `${ingredientData.find((ingredient) => ingredient.name === ing.name)?.bottleHeight}%`} }
							onClick={() => handleAddIngredient(ing.name)}>
			      <Bottle caption={BarStore.drink.ingredients[index].name}/>
						</button>
					))}

				</div>
					<div className="w-full h-[30%] mb-[10%] bg-[#710101] rounded-[0%_0%_10px_10px] flex" />
					
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
				fontSize: `${BarStore.isHolding ? 24+(BarStore.shakeCount*6) : 24 }px`
				}}
				onTouchStart={() => handleShakeStart()}
				onTouchEnd={() => handleShakeEnd()}
				>

			{BarStore.isHolding ? `${BarStore.shakeCount}` : "Hold to shake"}
			</button>
			
			}
			</div>
		
		</div>
	)
}