import strLimit from '../utils/strLimit.js';

export function createRecipeDOM(recipe) {
    const ingredientsList = recipe.ingredients?.map(ingredient => {
        const quantity = ingredient.quantity ? ingredient.quantity : '';
        const unit = ingredient.unit ? ingredient.unit : '';
        return `<div><strong>${ingredient.ingredient}</strong>: ${quantity} ${unit}</div>`;
    }).join('');

    const article = document.createElement('article');
    article.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');
    article.innerHTML = `
            <div class="bg-light rounded-2">
                <div class="d-flex justify-content-between">
                    <h2 class="card__title m-3">
                        ${recipe.name}
                    </h2>
                    <span class="card__time m-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                        </svg>
                        ${recipe.time} min
                    </span>
                </div>
                <div class="row card__description p-3">
                    <div class="col">
                        ${ingredientsList}
                    </div>
                    <div class="col textEllipsisArea">
                        ${strLimit(recipe.description, 200)}
                    </div>
                </div>
            </div>
    `;

    return article;
}
