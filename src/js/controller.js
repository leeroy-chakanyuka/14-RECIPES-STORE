import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import recipeView from './views/recipeView';
import recipeView from './views/recipeView';
// console.log(icons)
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. GETTING THE RECIPE FROM THE API
    await model.loadRecipe(id);
    // 2. RENDERING THE RECIPE
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError(error);
  }
}

recipeView.addHandlerRender(function () {
  alert('yo, ball');
});
function init() {
  recipeView.addHandlerRender(controlRecipe);
}

init();
