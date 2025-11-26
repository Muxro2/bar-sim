import Image from 'next/image';
import coupe from '@/public/bar-sim/coupe.svg'

import { barStore } from '@/stores/barStore'

export default function Glass({ children }: { children?: React.ReactNode }) {
	const BarStore = barStore()
	
	if (BarStore.drink.glass=="coupe") {
	return (
    <div className="relative w-[26vw] aspect-4/5 flex justify-center">
			<Image
				src={coupe}
				alt="Coupe"
				width={100}
				height={100}
				/>
			<div className="absolute -translate-y-[50%] w-[90%] aspect-1/1 rounded-[100%] overflow-hidden flex flex-col justify-end">
        <div className="relative w-full h-[49%] bg-blue-400/40">
					{children}
				</div>
			</div>
			
		</div>
	);
	} else if (BarStore.drink.glass=="rocks") {
		return (
		<div className="relative w-[26vw] aspect-1/1 bg-blue-400">
				<div className="relative mx-auto w-[90%] h-[90%] bg-blue-700/40 flex justify-center">
					{children}
					<div className="absolute w-[80%] bottom-0 aspect-1/1 bg-blue-200/20 border-1 border-blue-400/50"/>
				</div>

		</div>
	  )
	}
}