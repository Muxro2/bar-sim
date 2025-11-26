import Image from 'next/image';

interface Props {
	text: string,
	action: () => void
	
}

export default function GlassImage({text, action}: Props) {
	return (
		<button className="relative w-[25vw] h-full flex justify-center"
			onClick={action}>
			<Image
				src="/bar-sim/bgCoupe.svg"
				alt="Glass"
				width={0}
				height={0}
				className="w-full h-full rotate-180"
				/>
			<h1 className="absolute w-[80%] text-[12px] text-[#613131] font-bold tracking-[0px] bottom-1">{text.toUpperCase()}</h1>
		</button>
	)
}

