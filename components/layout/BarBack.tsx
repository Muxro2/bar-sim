import Image from 'next/image';

import Person from '@/components/bar/Person';

export default function BarBack() {
	return (
		<div className="relative w-full h-[55%] bg-[#110101]">

		

			{/* Shelves */}
			<div className=" w-[80%] h-2 mx-auto mt-[30%] bg-[#310101]"></div>
			<div className=" w-[70%] h-2 mx-auto mt-15 bg-[#310101]"></div>

			{/* Person */}
			{Array.from({ length: 3}).map((_, i) => (
			<Person key={i} />
			))}

		</div>
	)
}