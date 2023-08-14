export const NUTRITION_OPTIONS = [
    "Total Fat",
    "Saturated Fat",
    "Trans Fat",
    "Cholesterol",
    "Sodium",
    "Total Carbohydrate",
    "Dietary Fiber",
    "Sugars",
    "Protein",
]

export const NUTRITION_REGEX = new RegExp("(" + NUTRITION_OPTIONS.join("|") + ")");

export interface WalmartItem {
    title: string | undefined,
    price: string | undefined,
    image: string | undefined,
    urlLink: string | undefined
}

export interface NutritionFactsNode {
    name: string | undefined,
    amount: string | undefined,
    percentDailyValue: string | undefined
}

export interface NutritionFacts {
    servingsPerContainer: string | undefined,
    calories: string | undefined,
    servingSize: string | undefined,
    facts: NutritionFactsNode[]
}

export interface SupplementaryInfo {
    nutritionFacts: NutritionFacts | undefined,
    rating: string | undefined,
    numReviews: string | undefined,
    description: string | undefined
}

export interface DetailedWalmartItem extends WalmartItem {
}