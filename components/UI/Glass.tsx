import Image from 'next/image';

export default function Glass({ children }: { children?: React.ReactNode }) {
	return (
    <div className="relative w-40 h-50 flex justify-center">
			<Image
				src="/bar-sim/coupe.svg"
				alt="Coupe"
				fill
				/>
			<div className="absolute -translate-y-[50%] w-[90%] aspect-1/1 rounded-[100%] overflow-hidden flex flex-col justify-end">
        <div className="w-full h-[35%] bg-blue-300">
					{children}
				</div>
			</div>
			
		</div>
	);
}