import Image from 'next/image';

interface HeaderProps {
	source: any,
	text: string
}

export default function Notification({ source, text }: HeaderProps) {
	return (
		<div className="w-[90%] my-2 mx-auto p-4 rounded-xl border-1 border-[#e65820] flex items-center gap-4">
			<Image
				src={source}
				alt="🔥"
				width={30}
				height={30}
				/>
			<h1 className="text-sub text-[#e65820] font-bold">{text}</h1>
		</div>
	)
}