"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image';

interface ButtonProps {
	href: string,
	icon: any,
	title: string,
	description: string,
	info?: string
}

export default function IconButton({ href, icon, title, description, info }: ButtonProps) {

	const router = useRouter()
	
	function handleClick(){
		console.log("daily challenge pressed")
		router.push(href)
	}
	
	return (
		<button
			className="w-[90%] my-2 mx-auto p-5 rounded-xl bg-accent flex items-center gap-4"
			onClick={() => handleClick()}
			>
			<Image
				src={icon}
				alt="🔥"
				width={40}
				height={40}
				/>
			<div className="flex flex-col items-start">
				<h1 className="text-sub font-bold">{title}</h1>
				<h1 className="text-[16px] pb-2">{description}</h1>
			  <h1 className="text-sub font-bold">{info}</h1>
			</div>
		</button>
	)
}