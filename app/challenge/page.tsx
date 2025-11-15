"use client";

import { useState, useEffect } from "react";
import { drinks } from "@/lib/drinks";

import BarBack from '@/components/Layout/BarBack'
import Tin from '@/components/UI/Tin'
import Glass from '@/components/UI/Glass'
import Bottle from '@/components/UI/Bottle'

export default function Challenge() {
	const [drink, setDrink] = useState(drinks[0]);
	const [phase, setPhase] = useState("ingredients");
	const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
	const [hasIce, setHasIce] = useState(false);
	const [isMixed, setIsMixed] = useState(false);
	const [selectedGlass, setSelectedGlass] = useState<string | null>(null);

  const glasses = ["🥃", "🍸", "🥛"]
	
	function handleAddIngredient(name: string) {
		if (!addedIngredients.includes(name)) {
			const updated = [...addedIngredients, name];
			setAddedIngredients(updated);

			if (updated.length == drink.ingredients.length) {
				if (drink.method == "shake") setPhase("ice");
				else setPhase("glass");
			}
		}
	}

	function handleAddIce() {
		if (phase == "ice") {
		setHasIce(true)
		setPhase("mix")
		}
	}

	function handleMix() {
		if (phase == "mix") {
			setIsMixed(true)
			setPhase("glass")
		}
	}

	function handleGlassSelect(choice: string) {
		if (phase == "glass")  {
		if (choice == drink.glass) {
	    setSelectedGlass(choice)
			setPhase("complete")
		}
		else {
			alert("wrong try again")
		}
	}}

	return (
		<>
			<BarBack />
			<Bottle caption={"Triple Sec"} color="#FFDAAB"></Bottle>
			<div className="w-full pt-[10%] flex justify-center">
			<Tin phase={phase} ingredients={addedIngredients} hasIce={hasIce} isMixed={isMixed}/>
			</div>
			
				<h1>{phase}</h1>
			{drink.ingredients.map((ing, index) => (
				<button
					key={index}
					onClick={() => handleAddIngredient(ing.name)}
					className={`p-2 border-1 border-white/10
					${addedIngredients.includes(ing.name) ? "bg-green-500" : ""}`}
				>
					{ing.name}
				</button>
			))}

			<button
				onClick={() => handleAddIce()}
				className={`p-2 ${hasIce? "bg-green-500" : ""}`}
			>
				Ice
			</button>
			
			<button
				onClick={() => handleMix()}
				className={`p-2 ${isMixed? "bg-green-500" : ""}`}
			>
				{drink.method}
			</button>

			{glasses.map((glass, index) => (
				<button key={index}
					onClick={() => handleGlassSelect(glass)}
					className="text-title leading-[1em]"
					>
					{glass}
				</button>
			))}


			{phase == "complete" ? 
			  <h1>Well Done you made a perfect {drink.name}</h1>
				:
				<></>
			}
		</>
	);
}
