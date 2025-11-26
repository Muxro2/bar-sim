import Image from 'next/image';
import coupe from '@/public/bar-sim/coupe.svg'

export default function Glass({ children }: { children?: React.ReactNode }) {
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
}