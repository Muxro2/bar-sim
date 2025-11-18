;import { useState, useEffect } from 'react'
import {motion, useAnimationControls } from 'framer-motion'

import { ingredientColors } from '@/lib/drinks'


{/* Types */}
interface TinProps {
	phase:string,
	isHolding: boolean,
	addedIngredients: string[],
	addedIce: boolean,
	isMixed: boolean,
	setTinReset: void,
}


export default function Tin({ phase, isHolding, addedIngredients, addedIce, isMixed, setTinReset}: TinProps) {
  const [showLiquid, setShowLiquid] = useState(true)
	
	const tinControls = useAnimationControls()

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
		}
		}
		resetTin()
	}, [isMixed])
	
	{/* Animations */}
	const liquidVariants = {
		"hidden": { height: 0 },
		"pouring": { height: '10%', transition: { duration: 2 }},
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
			<div className="absolute top-0 inset-[1%] bg-neutral-800 clip-tin flex flex-col-reverse">

				
				{/* Liquid Layers */}
				{isMixed ? 
						<motion.div
							className="w-full h-[80%] translate-y-[3%]"
							style={{
								backgroundColor: "#dddd88",
								
							}}
							variants={liquidVariants}
							animate="bobbingFull"
						/>
					: 
				addedIngredients?.map((name, index) => (
					<motion.div
						key={index}
						className="w-full translate-y-[3%]"
						style={{
							backgroundColor: ingredientColors[name]
						}}
						variants={liquidVariants}
						initial={{ height: 0 }}
						animate={addedIce? "bobbing" : "pouring"}
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