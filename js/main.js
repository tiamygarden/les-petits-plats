import { createRecipeDOM } from './pages/createRecipeDOM.js';
import MainSearch from './search/MainSearch.js';
import recipes from '../data/recipes.js';

const recipesSection = document.querySelector('#recipes');

recipes.forEach((recipe) => {
    recipesSection.appendChild(createRecipeDOM(recipe));
});

new MainSearch(recipes, recipesSection).init()
