;import { useState, useEffect } from 'react'
import {motion, useAnimationControls } from 'framer-motion'

import { ingredientData } from '@/lib/drinks'

import { Drink, Ingredient } from '@/types/drinkTypes'

import { barStore } from '@/stores/barStore'



export default function Jug() {
  const BarStore = barStore()
	
	const [showLiquid, setShowLiquid] = useState(true)
	
	const tinControls = useAnimationControls()
	const spoonControls = useAnimationControls()
	const liquidControls = useAnimationControls()

  useEffect(() => {
		async function replaceTin() {
			await tinControls.start({opacity: 0, y: 10})
			tinControls.set("initial")
			tinControls.set({y: 10})
			await tinControls.start({opacity: 1, y: 0, transition:{duration: .5}})
		}
		if (BarStore.toggleResetDrink) {
		 replaceTin()
		 BarStore.setToggleResetDrink(false)
		}
	}, [BarStore.toggleResetDrink])
	
  useEffect(() => {
		async function stirSequence() {
			setShowLiquid(false)
		  await tinControls.start("shrink")
			await spoonControls.start ("drop")
			if (BarStore.isHolding) {
			  spoonControls.start("stir")
			} if (!BarStore.isHolding) {
				await spoonControls.start({x: 0})
			}
		}

		if (BarStore.phase=="shake") {
		  stirSequence()
		} 

	}, [BarStore.phase, BarStore.isHolding])

	useEffect(() => {
		async function resetTin() {
		if (BarStore.isMixed) {
			tinControls.stop()
			await tinControls.start({rotate: 0, y:0, x:0, transition: {duration: 1}})
			await tinControls.start({width: "30vw", transition: { duration: 1 }})
			setShowLiquid(true)
			BarStore.setTinReset(true)
			tinControls.start({x: "20vw"})
		}}
		resetTin()
	}, [BarStore.isMixed])

	useEffect(() => {
	  async function Strain() {
			if (BarStore.fillGlass) {
				tinControls.start("pour")
				await liquidControls.start("straining")
				tinControls.start({left: "100%"})
			} 
		}

		Strain()
		
	}, [BarStore.fillGlass])
	
	{/* Animations */}
	const liquidVariants = {
		"hidden": { height: 0 },
		"pouring": { height: '10%', transition: { duration: .5 }},
		"bobbing": { 
			height: `${1/BarStore.addedIngredients.length*80}%`,
			y: [0,'1%',0],
			transition: { 
				height: { duration: 1 },
				y: {repeat: Infinity}
			}
		},
    "bobbingFull": { 
			height: `80%`,
			y: [0,'1%',0],
			transition: { 
				y: {repeat: Infinity}
			}
		},
		"straining": {
			width: "250%",
			x: "-30%",
			rotate: 105,
			transformOrigin: "top",
			transition: { rotate: { duration: .5 }, x: { duration: 2 } }
			
		}
	}

	const spoonVariants = {
		"initial": { opacity: 0, y: "-120%"},
		"drop": { opacity: 1, y: "0%", transition: { duration: 1 }},
		"stir": { x: ["350%","-350%","350%"], transition: { repeat: Infinity } }
	}

	const tinVariants = {
		"initial": { width: "30vw", rotate: 0, y: 0, x: 0, left: 0 },
		"shrink": { width: "16vw", transition: { duration: 1 } },
		"shake": { 
			rotate: [45,30,45],
			y: [-60,-30,-60],
			x: [0,-20,0],
			transition: { 
				rotate: { repeat: Infinity, duration: .3 },
				y: { repeat: Infinity, duration: .3},
				x: { repeat: Infinity, duration: .3 },
			}
		},
		"pour": {
			rotate: -105,
			y: -150,
			transition: { duration: .5}
		}
	}
	
	return (
		<motion.div className="relative w-[30vw] flex justify-center origin-center"
		  variants={tinVariants}
			initial="initial"
			animate={tinControls}
			>

		{(BarStore.phase=="shake") &&
		/* Spoon */
		<motion.div className="absolute w-[10%] h-[150%] bottom-0 bg-neutral-400"
			variants={spoonVariants}
			initial="initial"
			animate={spoonControls}
			transition={{ duration: 1 }}
			
			/>
		}
			
		<div className="relative w-[100%] aspect-2/3 bg-neutral-100 ">

			{showLiquid && 
			/* Inner tin */
			<div className="absolute top-0 inset-[1%] bg-neutral-800 flex flex-col-reverse items-center overflow-hidden">

				
				{/* Liquid Layers */}
				{BarStore.isMixed ? 
						<motion.div
							className="w-full h-[80%] translate-y-[3%]"
							style={{
								backgroundColor: BarStore.drink.color,
								
							}}
							variants={liquidVariants}
							animate={liquidControls}
						/>
					: 
				BarStore.addedIngredients?.map((ing, index) => (
					<motion.div
						key={index}
						className="w-full"
						style={{
							backgroundColor: ingredientData.find(dataIng => dataIng.name === ing.name)?.color
						}}
						variants={liquidVariants}
						initial={{ height: 0 }}
						animate={BarStore.addedIce? 
							{ 
								height: `${ing.amount/1.5}%`,
								y: [0,'1%',0],
								transition: { 
									height: { duration: 1 },
									y: {repeat: Infinity}
								}
							} 
						: { height: `${ing.amount/2.5}%`, transition: { duration: 2 }} }
					/>
				))}

					{/* Ice Cubes */}
					{BarStore.addedIce &&
						Array.from({ length: 8 }).map((_, index) => {
							const left = 10 + Math.random() * 50;
							const size = 30 + Math.random() * 10;
							const startBottom = 50 + Math.random() * 50; // start above the container
              const endBottom = startBottom - (40 + (Math.random() * 10));
							
							return (
								<motion.div
									key={index}
									className="absolute bg-blue-300/30 border border-white/40 rounded-lg"
									style={{
										opacity: 0,
										left: `${left}%`,
										width: `${size}%`,
										height: `${size}%`,
										bottom: startBottom,
									}}
									animate={BarStore.isMixed ? {
										opacity: 1,
										y: [0, 6, 0]               
									}	: {
										opacity: 1,
										bottom: [`${startBottom}%`, `${endBottom}%`], // drop into the shaker
										y: [0, 6, 0]                 
									}}
									transition={{
										opacity: { duration: 1 + Math.random() },
										bottom: { duration: 1 + Math.random(), ease: "easeOut" },
										y: { repeat: Infinity, duration: 2 + Math.random() }
									}}
								/>
							)
						})
					}
			</div>
			}
		</div>
		</motion.div>
	)
}