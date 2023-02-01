export default class SearchRecipes {
    constructor(Recipes) {
        this.Recipes=Recipes
        this.isSearching=false

        this.RecipeNameSearch= new RecipesNameSearch(Recipes)
        // this.ingredientsNameSearch= new ingredientsNameSearch(Recipes)
        this.descriptionNameSearch= new descriptionNameSearch(Recipes)

        this.$wrapper = document.createElement('div')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$recipesWrapper = document.querySelector('.movies-wrapper')

        this.name = recipe.name;
        this.ingredients = recipe.ingredients
        this.description = recipe.description

    }

search(query) {
    let SearchedRecipes = null

    if (this.isSearching) {
        SearchedRecipes = this.recipeNameSearch.search(query)
        } else {
        SearchedRecipes= this.descriptionNameSearch.search(query)
    }

    this.displayRecipes(SearchedRecipes);
}

clearRecipesWrapper() {
    this.$recipesWrapper.innerHTML = '';
}

displayRecipes(Recipes) {
    this.clearMoviesWrapper();

    Recipes.forEach(recipe => {
        const Template = new MovieCard(recipe);
        this.$recipesWrapper.appendChild(Template.createMovieCard());
    });
}

onSearch() {
    this.$wrapper
        .querySelector('form')
        .addEventListener('keyup', e => {
            const query = e.target.value;

            if (query.length >= 3) {
                this.search(query);
            } else if (query.length === 0) {
                this.displayRecipes(this.Recipes);
            }
        });
}

onChangeSearch() {
    this.$wrapper
        .querySelector('.search-checkbox')
        .addEventListener('change', e => {
            this.isSearching = e.target.checked;

            console.log(this.isSearching);
        });
}

render() {
    const searchForm = `
            <form action="#" method="POST">
                <div class="search-input">
                    <label for="search">Rechercher : </label> 
                    <input id="search" type="text">
                </div>
                <div class="search-checkbox">
                    <label for="actor">Rechercher par acteur</label>
                    <input id="actor" type="checkbox" />
                </div>
            </form>
        `;

    this.$wrapper.innerHTML = searchForm;

    this.onSearch();
    this.onChangeSearch();

    this.$searchFormWrapper.appendChild(this.$wrapper);
}

}
