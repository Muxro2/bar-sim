export const drinks = [
		{
			id: "margarita",
			name: "Margarita",
			method: "shake",
			glass: "🍸",
			ingredients: [
				{"name": "Tequila", "amount": 50 },
				{"name": "Triple Sec", "amount": 25 },
				{"name": "Lime Juice", "amount": 25 }
			]
		}
	]

export const ingredientColors: Record<string, string> = {
	"Lime Juice": "#D1FFCC",
	"Tequila": "#D4D5D2",
	"Triple Sec": "#FFDAAB",
	}