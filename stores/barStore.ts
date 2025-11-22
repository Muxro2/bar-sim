import { create } from 'zustand'

import { drinks } from '@/lib/drinks'
import { Drink } from '@/types/drinkTypes'

interface BarStoreType {
	drink: Drink,
	setDrink: (drink: Drink) => void
}

export const barStore = create<BarStoreType>((set) => ({
	drink: drinks[1],
	setDrink: (drink) => set({ drink: drink })
}))
	
