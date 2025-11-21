;import { useState, useEffect } from 'react'
import {motion, useAnimationControls } from 'framer-motion'

import { ingredientData } from '@/lib/drinks'

import { Ingredient } from '@/types/drinkTypes'

{/* Types */}
interface TinProps {
	phase:string,
	isHolding: boolean,
	addedIngredients: Ingredient[],
	addedIce: boolean,
	isMixed: boolean,
	fillGlass: boolean,
	setTinReset: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function Tin({ phase, isHolding, addedIngredients, addedIce, isMixed, fillGlass, setTinReset}: TinProps) {
  const [showLiquid, setShowLiquid] = useState(true)
	
	const tinControls = useAnimationControls()
	const liquidControls = useAnimationControls()

  useEffect(() => {
		async function shakeSequence() {
			setShowLiquid(false)
		  await tinControls.start("shrink")
			if (isHolding) {
				await tinControls.start({rotate: [0,45], y:[0,-60], x:0, transition: { duration: .5 } })
			  tinControls.start("shake")
			} else {
				tinControls.stop()
				tinControls.start({rotate: 0, y:0, x:0})
			}
		}

		if (phase=="shake") {
		  shakeSequence()
		}
	}, [phase, isHolding])

	useEffect(() => {
		async function resetTin() {
		if (isMixed) {
			tinControls.stop()
			await tinControls.start({rotate: 0, y:0, x:0})
			await tinControls.start("initial", { duration: 1 })
			setShowLiquid(true)
			setTinReset(true)
			tinControls.start({x: "20vw"})
		}
		}
		resetTin()
	}, [isMixed])

	useEffect(() => {
	  async function Strain() {
			if (fillGlass) {
				tinControls.start("pour")
				await liquidControls.start("straining")
				tinControls.start({left: "100%"})
			}
		}

		Strain()
		
	}, [fillGlass])
	
	{/* Animations */}
	const liquidVariants = {
		"hidden": { height: 0 },
		"pouring": { height: '10%', transition: { duration: .5 }},
		"bobbing": { 
			height: `${1/addedIngredients.length*80}%`,
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

	const lidVariants = {
		"initial": { opacity: 0, rotate: 180, y: "-120%"},
		"close": { opacity: 1, y: "-100%", transition: { duration: 1 }},
	}

	const tinVariants = {
		"initial": { width: "30vw", rotate: 0, y: 0, x: 0 },
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

		{(phase=="shake") &&
		/* Lid */
		<motion.div className="absolute w-[90%] aspect-3/4 bg-neutral-400 clip-tin"
			variants={lidVariants}
			initial="initial"
			animate="close"
			transition={{ duration: 1 }}
			
			/>
		}
			
		<div className="relative w-[100%] aspect-2/3 bg-neutral-100 clip-tin">

			{showLiquid && 
			/* Inner tin */
			<div className="absolute top-0 inset-[1%] bg-neutral-800 clip-tin flex flex-col-reverse items-center">

				
				{/* Liquid Layers */}
				{isMixed ? 
						<motion.div
							className="w-full h-[80%] translate-y-[3%]"
							style={{
								backgroundColor: "#dddd88",
								
							}}
							variants={liquidVariants}
							animate={liquidControls}
						/>
					: 
				addedIngredients?.map((ing, index) => (
					<motion.div
						key={index}
						className="w-full"
						style={{
							backgroundColor: ingredientData.find(dataIng => dataIng.name === ing.name)?.color
						}}
						variants={liquidVariants}
						initial={{ height: 0 }}
						animate={addedIce? 
							{ 
								height: `${ing.amount/1.2}%`,
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
					{addedIce &&
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
									animate={isMixed ? {
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