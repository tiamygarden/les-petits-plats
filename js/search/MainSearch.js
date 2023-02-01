import {createRecipeDOM} from '../pages/createRecipeDOM.js';
import listRender from "../utils/listRender.js";

export default class MainSearch {
    _recipes;
    _recipesSection;

    constructor(recipes, recipesSection) {
        this._recipes = recipes;
        this._recipesSection = recipesSection;

        const searchInput = document.getElementById('recipeFinderInput');
        searchInput.onkeyup = (event) => {
            if (event.target.value.length > 2) {
                this.search(event.target.value)
            } else {
                this.search('')
            }
        }

        listRender(recipes)
    }

    search(query) {
        const recipes = this._recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query.toLowerCase())
                || recipe.description.toLowerCase().includes(query.toLowerCase())
                || recipe.ingredients.find(
                    ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()),
                );
        });

        this._recipesSection.innerHTML = '';

        recipes.forEach(recipe => this._recipesSection.appendChild(createRecipeDOM(recipe)));
        listRender(recipes)
    }
}