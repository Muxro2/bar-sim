export default function BarBack() {
	return (
		<div className="absolute w-full h-[80%] bg-[#210101] overflow-hidden -z-1">
			{/* Back wall (slightly lighter than background) */}
			<div className="absolute top-0 left-0 w-full h-full bg-[#310101]"></div>

			{/* Shelves */}
			<div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-[#420101] rounded-lg shadow-inner"></div>
			<div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2/3 h-2 bg-[#420101] rounded-lg shadow-inner"></div>
			{/* Bar counter */}
			<div className="absolute bottom-0 left-0 w-full h-1/4 bg-[#420101] shadow-inner"></div>
		</div>
	);
}
