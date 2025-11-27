export const drinks = [
		{
			id: "margarita",
			name: "Margarita",
			method: "shake",
			glass: "coupe",
			ingredients: [
				{"name": "Tequila", "amount": 50 },
				{"name": "Triple Sec", "amount": 25 },
				{"name": "Lime Juice", "amount": 25 }
			],
			color: "#ddddaa"
		},
	{
		id: "daiquiri",
		name: "Daquiri",
		method: "shake",
		glass: "coupe",
		ingredients: [
			{"name": "Rum", "amount": 50 },
			{"name": "Sugar Syrup", "amount": 25 },
			{"name": "Lime Juice", "amount": 25 }
		],
		color: "#e0ffcc"
	},
		{
		id: "sidecar",
		name: "Sidecar",
		method: "shake",
		glass: "coupe",
		ingredients: [
			{"name": "Cognac", "amount": 50 },
			{"name": "Triple Sec", "amount": 25 },
			{"name": "Lemon Juice", "amount": 25 }
		],
		color: "#ffc18f"
	},
	{
		id: "pornstarmartini",
		name: "Pornstar Martini",
		method: "shake",
		glass: "coupe",
		ingredients: [
			{"name": "Vodka", "amount": 50 },
			{"name": "Passion. Liquer", "amount": 25 },
			{"name": "Passion. Puree", "amount": 25 },
			{"name": "Lime Juice", "amount": 25 },
		],
		color: "#F2BB63"
	},
	{
		id: "negroni",
		name: "negroni",
		method: "stir",
		glass: "rocks",
		ingredients: [
			{"name": "Gin", "amount": 25 },
			{"name": "Vermouth", "amount": 25 },
			{"name": "Campari", "amount": 25 },
		],
		color: "#cc9999"
	}
	]

interface IngredientDataType {
	name: string,
	color: string,
	bottleHeight: number,
}

export const ingredientData: IngredientDataType[] = [
		
  {"name": "Vodka", "color": "#DDDDFF", "bottleHeight": 100},
	{"name": "Tequila", "color": "#D4D5D2", "bottleHeight": 80},
	{"name": "Rum", "color": "#FFFFFF", "bottleHeight": 90},
	{"name": "Cognac", "color": "#FFaaaa", "bottleHeight": 80},
	{"name": "Gin", "color": "#eeffee", "bottleHeight": 80},
	
	{"name": "Triple Sec", "color": "#FFDAAB", "bottleHeight": 80},
  {"name": "Vermouth", "color": "#ffeedd", "bottleHeight": 100},
	{"name": "Campari", "color": "#FFaaaa", "bottleHeight": 100},
	{"name": "Passion. Liquer", "color": "#FFddbb", "bottleHeight": 90 },

	
	{"name": "Lime Juice", "color": "#D1FFCC", "bottleHeight": 100},
	{"name": "Lemon Juice", "color": "#FFFFCC", "bottleHeight": 100},
	{"name": "Sugar Syrup", "color": "#D4D5D2", "bottleHeight": 100},
	{"name": "Passion. Puree", "color": "#F2BB63", "bottleHeight": 90},
]