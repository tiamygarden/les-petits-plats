export default function (recipes) {
    createIngredients(recipes)
    createAppliances(recipes)
    createUstensils(recipes)
}

function createIngredients(recipes) {
    const wrapper = document.getElementById('ingredientsOptions')

    const map = new Map
    recipes.forEach(recipe => recipe.ingredients.forEach(i => map.set(i.ingredient, '')))

    let html = ''
    map.forEach((value, ingredient) => html += `<li>${ingredient}</li>`)
    wrapper.innerHTML = html
}

function createAppliances(recipes) {
    const wrapper = document.getElementById('appliancesOptions')

    const map = new Map
    recipes.forEach(recipe => map.set(recipe.appliance, ''))

    let html = ''
    map.forEach((value, appliance) => html += `<li>${appliance}</li>`)
    wrapper.innerHTML = html
}

function createUstensils(recipes) {
    const wrapper = document.getElementById('ustensilsOptions')

    const map = new Map
    recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => map.set(ustensil, '')))

    let html = ''
    map.forEach((value, ustensil) => html += `<li>${ustensil}</li>`)
    wrapper.innerHTML = html
}