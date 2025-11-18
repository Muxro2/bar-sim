
import {motion} from 'framer-motion'

import { ingredientColors } from '@/lib/drinks'


{/* Types */}
interface TinProps {
	addedIngredients: string[],
	addedIce: boolean,
	isMixed: boolean;
}


export default function Tin({addedIngredients, addedIce, isMixed}: TinProps) {
	
	
	{/* Animations */}
	const liquidVariants = {
		"hidden": { height: 0 },
		"pouring": { height: '10%', transition: { duration: 2 }},
		"bobbing": { height: `${1/addedIngredients.length*80}%`, y: [0,'1%',0], transition: { height: { duration: 2}, y: {repeat: Infinity}} }

	}

	const lidVariants = {
		"initial": { opacity: 0, rotate: 180, y: "-120%"},
		"close": { opacity: 1, y: "-100%", transition: { duration: 2 }},
	}

	const tinVariants = {
		"initial": { width: "30vw" },
		"shrink": { width: "18vw", transition: { duration: 2 } }
	}
	
	return (
		<motion.div className="relative w-[30vw] flex justify-center"
		variants={tinVariants}
			initial="initial"
			animate={isMixed ? "shrink" : ""}
			>

		{isMixed &&
		/* Lid */
		<motion.div className="absolute w-[90%] aspect-3/4 bg-neutral-400 clip-tin"
			variants={lidVariants}
			initial="initial"
			animate="close"
			transition={{ duration: 1 }}
			/>
		}
			
		<div className="relative w-[100%] aspect-2/3 bg-neutral-100 clip-tin">

			{!isMixed && 
			/* Inner tin */
			<div className="absolute top-0 inset-[1%] bg-neutral-800 clip-tin flex flex-col-reverse">

				
				{/* Liquid Layers */}
				{addedIngredients?.map((name, index) => (
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
			}
		</div>
		</motion.div>
	)
}