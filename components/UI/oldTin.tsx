"use client"

import { motion } from 'framer-motion'

interface TinProps {
	phase: string,
	ingredients: string[],
	hasIce: boolean,
	isMixed: boolean
}

export default function Tin({ phase, ingredients, hasIce, isMixed }: TinProps) {
  const layerHeight = (1/ingredients.length)
	const isPouring = true

  const layerHeights = {
		noIce: { height: "10%" },
		ice: {
			height: `${layerHeight*90}%`,
			y: [0, -1, 0],
			transition: { y: { repeat: Infinity } }
		},
	}

	const iceVariants = {
		initial: {opacity: 0, y: -30},
		drop: {
			opacity: 1, 
			y: 20,
			transition: { duration: 4 },
		},
		float: {
			y: [0, 6, 0],
			rotate: [0, 6, 0], 
			transition: { 
				rotate: { repeat: Infinity, duration: 3  },
				y: { repeat: Infinity, duration: 2  }
			} ,
		},
	}

	const lidVariants = {
		hidden: {
			opacity: 0,
		},
		close: {
			opacity: 1,
			y: '-20%',
			transition: { 
				opacity: { duration: 1 },
				y: { duration: 2 }
			}
		},
		open: {
				opacity: 10,
				y: '20%',
				transition: { 
					opacity: { duration: 1 },
					y: { duration: 2 }
				}
		}
				
	}
	
	const ingredientColors: Record<string, string> = {
			"Lime Juice": "bg-linear-to-t from-[#D1FFCC90] to-[#EDFFD850]",
			"Tequila": "bg-linear-to-t from-[#D4D5D2] to-[#FFFFFF50]",
			"Triple Sec": "bg-linear-to-t from-[#FFDAAB90] to-[#FFE1BC50]",
	}
	
	return (
		<div className={`relative w-50 h-75 origin-[50%_25%] ${phase=="glass" ? "animate-shake-zoom" : ""} flex justify-center`}>
			
			{hasIce &&
			<motion.div 
				className="absolute -top-[80%] w-[90%] h-[70%] bg-neutral-300 clip-tin rotate-180 "
			  variants={lidVariants}
				initial="hidden"
				animate="close"
				/>}
			
			<div className="relative w-full h-full bg-white rounded-xl clip-tin">
				{phase=="glass" && <div className="absolute inset-1 flex flex-col-reverse bg-white rounded-xl clip-tin z-10"/>}
				<div className="absolute inset-1 flex flex-col-reverse bg-neutral-400 rounded-xl clip-tin">


					{/* Liquid Layers */}
					{ingredients.map((name, index) => (
						<motion.div
							key={index}
							className={`w-full ${isMixed ? "bg-yellow-200" : ingredientColors[name]}`}
							variants={layerHeights}
							animate={hasIce ? 'ice' : "noIce"}
							transition={{ duration: 1 }}
            />
					))}

					{/* Ice Cubes */}
					{hasIce &&
						Array.from({ length: 8 }).map((_, index) => {
							const left = 10 + Math.random() * 50;
							const size = 30 + Math.random() * 10;
							const startBottom = 50 + Math.random() * 50; // start above the container
              const endBottom = startBottom - (20 + (Math.random() * 30));
							
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
									animate={{
										opacity: 1,
										bottom: [`${startBottom}%`, `${endBottom}%`], // drop into the shaker
										y: [0, 6, 0]                   // floating
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
			</div>
		</div>
	)
}