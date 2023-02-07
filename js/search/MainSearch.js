import {createRecipeDOM} from '../pages/createRecipeDOM.js';
import listRender from "../utils/listRender.js";

export default class MainSearch {
    _recipes;
    _recipesSection;
    _filterBytags = [];
    _searchInput;

    constructor(recipes, recipesSection) {
        this._recipes = recipes;
        this._recipesSection = recipesSection;

        this._searchInput = document.getElementById('recipeFinderInput');
        this._searchInput.onkeyup = (event) => {
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
            const exist = recipe.name.toLowerCase().includes(query.toLowerCase())
                || recipe.description.toLowerCase().includes(query.toLowerCase())
                || recipe.ingredients.find(
                    ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()),
                );

            if (exist && this._filterBytags === []) {
                return true
            }

            if (exist) {
                let res = true
                this._filterBytags.forEach(tag => {
                    console.log(tag.name)
                    if (
                        tag.category === 'ingredient'
                        && !recipe.ingredients.find(ingredient => ingredient.ingredient === tag.name)
                    ) {
                        res = false
                    }
                    if (
                        tag.category === 'appliance'
                        && recipe.appliance!==tag.name
                    ) {
                        res = false
                    }
                    if (
                        tag.category === 'ustensil'
                        && !recipe.ustensils.includes(tag.name)
                    ) {
                        res = false
                    }
                })

                return res
            }

            return false
        });

        this._recipesSection.innerHTML = '';

        recipes.forEach(recipe => this._recipesSection.appendChild(createRecipeDOM(recipe)));
        listRender(recipes)
    }

    addTagFilter(name, category) {
        this._filterBytags.push({name, category})
        this.search(this._searchInput.value)
    }
}
