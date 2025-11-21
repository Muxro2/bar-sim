import Image from 'next/image';

import Person from '@/components/bar/Person';

export default function BarBack() {
	return (
		<div className="relative w-full h-[55%] bg-[#110101]">

			{/* Glass Rack */}
			<div className="w-full h-[30%] -translate-y-5 flex justify-center gap-[1%]">
			{Array.from({ length: 4 }, (_, i) => (
				<Image
				key={i}
				src="/bar-sim/bgCoupe.svg"
				alt="Glass"
				width={0}
				height={0}
				className="w-[24%] h-full rotate-180"
				/>
			))}
			</div>

			{/* Shelves */}
			<div className=" w-[80%] h-2 mx-auto mt-12 bg-[#210101]"></div>
			<div className=" w-[70%] h-2 mx-auto mt-15 bg-[#210101]"></div>

			{/* Person */}
			{Array.from({ length: 3}).map((_, i) => (
			<Person key={i} />
			))}

		</div>
	)
}