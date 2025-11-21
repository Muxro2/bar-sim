export default function IceBucket() {
	return (
				<div className="w-full h-full flex flex-col justify-end">

					{/* Cubes in bucket */}
					{Array.from({ length: 3 }, (_, i) => (
					<div key={i} className="w-full h-[10%] flex justify-center">
						{Array.from({ length: i+1 }, (_, i) => (
						<div 
							key={i} 
							className="w-[30%] aspect-1/1 bg-blue-100 border-1 border-blue-300 rounded-md"
							style={{
								rotate: `${80 * i}deg`
							}}
							/>
						))}
					</div>
					))}
						
					<div className="w-full h-[70%] bg-[#310101] rounded-[10px] clip-bucket"/>

					
				</div>
	)
}