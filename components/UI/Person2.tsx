import { motion, Variants, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export default function Person() {
  const personController = useAnimationControls()

	
	useEffect(() => {
		async function walkPerson() {
			while (true) {
			
			await personController.start("walkingBack")
			personController.stop()
			await personController.start("walking")
			}
		}
		walkPerson()
	}, [])

  const variants: Variants = {
		"initial": {
			x: "120vw"
		},
		"walking": {
			x: "110vw",
			y: [0,5,0],
			transition: {
				x: { duration: 5, ease: "linear" },
				y: { repeat: 10, duration: .5 },
				
			},
		},
		"walkingBack": {
			x: "-20vw",
			y: [0,5,0],
			transition: {
				x: { duration: 5, ease: "linear" },
				y: { repeat: 9, duration: .5 },
				
		  },
		}
	}
	
	return (
    <motion.div className="absolute h-[38%] aspect-1/2 bottom-0 flex flex-col"
			variants={variants}
			initial="initial"
			animate={personController}
			>
			<div className="w-full aspect-1/1 bg-[#210101] rounded-full translate-y-1"/>
			<div className="flex-1 w-full bg-[#210101] rounded-t-[100%]"/>
		</motion.div>
  )
}