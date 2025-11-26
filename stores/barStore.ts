import { create } from 'zustand'

import { drinks } from '@/lib/drinks'
import { Drink, Ingredient } from '@/types/drinkTypes'



interface BarStoreType {
	drink: Drink,
	setDrink: (drink: Drink) => void,

  toggleResetDrink: boolean,
	setToggleResetDrink: (toggleResetDrink: boolean) => void,
	
	phase: string,
	setPhase: (phase: string) => void,
	
	addedIngredients: Ingredient[],
	setAddedIngredients: (addedIngredients: Ingredient[]) => void,

	addedIce: boolean,
	setAddedIce: (addedIce: boolean) => void,
	isMixed: boolean,
	setIsMixed: (isMixed: boolean) => void,
	isHolding: boolean,
	setIsHolding: (isHolding: boolean) => void,
  tinReset: boolean,
	setTinReset: (setTinReset: boolean) => void,
  fillGlass: boolean,
	setFillGlass: (setFillGlass: boolean) => void,
	
	shakeCount: number,
	incrementShakeCount: () => void,
	resetCount: () => void,

}

export const barStore = create<BarStoreType>((set) => ({
	drink: drinks[0],
	setDrink: (drink) => set({ drink: drink }),

  toggleResetDrink: false,
	setToggleResetDrink: (toggleResetDrink) => set({ toggleResetDrink: toggleResetDrink}),

  phase: "ingredients",
	setPhase: (phase) => set({ phase: phase}),

	addedIngredients: [],
	setAddedIngredients: (addedIngredients) => set({ addedIngredients: addedIngredients}),

	addedIce: false,
	setAddedIce: (addedIce) => set({ addedIce: addedIce}),
	
	isMixed: false,
	setIsMixed: (isMixed) => set({ isMixed: isMixed}),

	isHolding: false,
	setIsHolding: (isHolding) => set({ isHolding: isHolding}),

	tinReset: false,
	setTinReset: (tinReset) => set({ tinReset: tinReset}),

	fillGlass: false,
	setFillGlass: (fillGlass) => set({ fillGlass: fillGlass}),

	shakeCount: 0,
	incrementShakeCount: () => set((state) => ({ shakeCount: state.shakeCount +1 })),
  resetCount: () => set({ shakeCount: 0 })
}))

	
