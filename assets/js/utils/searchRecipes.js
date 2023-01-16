export function searchRecipes(recipe) {
    const { name, ingredients, description } = recipe;

    const recipeFinder = document.querySelector('#recipeFinder');
    const searchValue = recipeFinder.value?.toLowerCase();
    return recipe.filter((recipe) => {

        // On concatène les champs pour avoir un string complet
        const recipeText = `${name} ${ingredients?.map(ingredient => ingredient.ingredient).join(' ')} ${description}`.toLowerCase();
        // On utilise includes pour vérifier si le mot clé est présent dans le text complet de la recette
        return recipeText.includes(searchValue);
    });
}
