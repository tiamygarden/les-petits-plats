import { createRecipeDOM } from './pages/createRecipeDOM.js';
import { searchRecipes } from './utils/searchRecipes.js';
import recipes from './data/recipes.js';

const recipesSection = document.querySelector('#recipes');

recipes.forEach((recipe) => {
    recipesSection.appendChild(createRecipeDOM(recipe));
});

createRecipeDOM(recipes);
searchRecipes(recipes);
