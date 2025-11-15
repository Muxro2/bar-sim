
import {motion} from 'framer-motion'

import { ingredientColors } from '@/lib/drinks'


{/* Types */}
interface TinProps {
	addedIngredients: string[],
	addedIce: boolean,
	isMixed: boolean;
}


export default function Tin({addedIngredients, addedIce}: TinProps) {
	
	
	{/* Animations */}
	const liquidVariants = {
		"hidden": { height: 0 },
		"pouring": { height: '10%', transition: { duration: 2 }},
		"bobbing": { height: `${1/addedIngredients.length*80}%`, y: [0,'1%',0], transition: { height: { duration: 2}, y: {repeat: Infinity}} }

	}
	
	return (
		<div className="relative w-[30vw] aspect-2/3 bg-neutral-100 clip-tin">
			{/* Inner tin */}
			<div className="absolute inset-[1%] bg-neutral-800 clip-tin flex flex-col-reverse">

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
		</div>
	)
}