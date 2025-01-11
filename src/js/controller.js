import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';

import searchView from './views/searchView';
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

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();

    if (!query) return;
    recipeView.renderSpinner();
    await model.loadSearchResults(query);
    //have to await this, so that it returns the resolved promise, otherwise nothing happens
    console.log(model.state.search.results);
  } catch (error) {
    console.error(error);
    recipeView.renderError(`${error.message}`);
  }
}
controlSearchResults();

function init() {
  recipeView.addHandlerRender(controlRecipe());
  searchView.addHandlerSearch(controlSearchResults);
}

init();
