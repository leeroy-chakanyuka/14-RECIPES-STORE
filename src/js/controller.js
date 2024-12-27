import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
function renderSpinner(elementToAttach) {
  const html = `<!-- <div class="spinner">
    <svg>
      <use href="${icons}.svg#icon-loader"></use>
    </svg>
  </div> -->
  `;
  elementToAttach.innerHTML = '';
  elementToAttach.insertAdjacentHTML('afterbegin', html);
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Getting the recipe from the API
async function showRecipe() {
  try {
    const id = window.location.hash;
    renderSpinner(recipeContainer);
    const response = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8704'
    );
    const data = await response.json();
    if (!response.ok) {
      alert(
        `please try a new ID, this one does not exist! Code : ${response.status}`
      );
      throw new Error('This ID does not exist!');
    }
    //we use let here because we want to make a new object completely, restructuring the formatting from the API
    let { recipe } = data.data;
    //get recipe, from the data object
    // console.log(recipe);
    recipe = {
      id: recipe.id,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      imageURL: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.sourceURL,
      title: recipe.title,
    };
    console.log(recipe);
    console.log(recipe.ingredients[0].description);
    // console.log(response);
    // console.log(data);

    const markupHTML = `<figure class="recipe__fig">
          <img src="${recipe.imageURL}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ing => {
              return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}.svg#icon-check"></use>
              </svg>
              <div class=" recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
              </div>
            </li>
            `;
            })
            .join('')}
          </div>


        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    recipeContainer.innerHTML = '';
    //we do this so that it gets rid of the "look for a recipe thing"
    recipeContainer.insertAdjacentHTML('afterbegin', markupHTML);
  } catch (error) {
    console.error(error);
  }
}
renderSpinner;
// console.log('here');
showRecipe();
window.addEventListener('hashchange', showRecipe());
