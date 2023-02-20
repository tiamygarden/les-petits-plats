import {createRecipeDOM} from '../pages/createRecipeDOM.js';
import listRender from "../utils/listRender.js";
import tagsRender from "../utils/tagsRender.js";

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
            // const bench = Bench()
            // for (let i = 0; i < 100; i++) {
                if (event.target.value.length > 2) {
                    this.search(event.target.value)
                } else {
                    this.search('')
                }
            // }
            // bench.stop()
        }

        tagsRender(this._filterBytags)
        listRender(recipes)
    }

    search(query) {
        const filteredRecipes = []

        for (const [i, recipe] of this._recipes.entries()) {
            const exist = recipe.name.toLowerCase().includes(query.toLowerCase())
                || recipe.description.toLowerCase().includes(query.toLowerCase())
                || recipe.ingredients.find(
                    ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()),
                )

            if (exist && this._filterBytags === []) {
                filteredRecipes.push(recipe);
            }

            if (exist && this.isFilteredByTag(recipe)) {
                filteredRecipes.push(recipe);
            }
        }

        //si la recherche ne retourne aucun résultat, on affiche un message
        if (filteredRecipes.length === 0) {
            this._recipesSection.innerHTML = `<div class="col-12 text-center">
                                                <p class="text-secondary">
                                                    Aucune recette ne correspond à votre critère… vous pouvez
                                                    chercher « tarte aux pommes », « poisson », etc.
                                                </p>
                                              </div>`
        }

        //sinon on affiche les recettes
        else {
            this._recipesSection.innerHTML = '';
            filteredRecipes.forEach(recipe => {
                this._recipesSection.appendChild(createRecipeDOM(recipe))
            })
        }
        listRender(filteredRecipes)
    }

    isFilteredByTag(recipe) {
        let res = true;

        this._filterBytags.forEach(tag => {
            if (
                tag.category === 'ingredient'
                && !recipe.ingredients.find(ingredient => ingredient.ingredient.toLowerCase() === tag.name)
            ) {
                res = false;
            }
            if (
                tag.category === 'appliance'
                && recipe.appliance.toLowerCase() !== tag.name
            ) {
                res = false;
            }
            if (
                tag.category === 'ustensil'
                && !recipe.ustensils.includes(tag.name)
            ) {
                res = false;
            }
        });

        return res
    }

    addTagFilter(name, category) {
        if (this._filterBytags.find(tag => tag.name === name)) return;

        this._filterBytags.push({name, category})

        this.search(this._searchInput.value)
        tagsRender(this._filterBytags)
    }

    removeTagFilter(tagName) {
        this._filterBytags = this._filterBytags.filter(tag => tag.name !== tagName)
        this.search(this._searchInput.value)
        tagsRender(this._filterBytags)
    }


}
