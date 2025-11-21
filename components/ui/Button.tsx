interface ButtonProps {
	children: React.ReactNode,
	style?: string
}

export default function Card({children, style}: ButtonProps) {


	return (
		<button className={`w-full rounded-lg p-2 ${style == "outline" ? "border-1 border-white/20" : "bg-accent"} `}>
			{children}
		</button>
	)
}