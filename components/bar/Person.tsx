

import { motion, Variants, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export default function Person() {
  const personController = useAnimationControls()

	
	useEffect(() => {
		async function walkPerson() {
			function sleep(ms: number) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}
				
			while (true) {
				await sleep(Math.random()*12000)
				await personController.start("walking")
				await sleep(Math.random()*10000)
				await personController.start("walkingBack")
				await sleep(Math.random()*12000)
			}
		}
		
		walkPerson()
	}, [])

  const variants: Variants = {
		"initial": {
			left: "-25%"
		},
		"walking": {
			left: "100%",
			y: [0,5,0],
			transition: {
				left: { duration: 5, ease: "linear" },
				y: { repeat: 9, duration: .5 },
				
			},
		},
		"walkingBack": {
			left: "-25%",
			y: [0,5,0],
			transition: {
				left: { duration: 5, ease: "linear" },
				y: { repeat: 9, duration: .5 },
				
		  },
		}
	}
	
	return (
    <motion.div className="absolute h-[40%] aspect-1/2 bottom-0 flex flex-col"
			variants={variants}
			initial="initial"
			animate={personController}
			>
			<div className="w-full aspect-1/1 bg-[#310101] rounded-full translate-y-1"/>
			<div className="flex-1 w-full bg-[#310101] rounded-t-[100%]"/>
		</motion.div>
  )
}