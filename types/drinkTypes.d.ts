export interface Drink {

	id: string,
	name: string,
	method: string,
	glass: string
	ingredients: Ingredient[],
	color: string
}

export interface Ingredient {
	
		name: string,
		amount: number

}