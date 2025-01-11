'use strict';
import { API_URL } from './config';
import { async } from 'regenerator-runtime';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: { query: '', results: [] },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      imageURL: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.sourceURL,
      title: recipe.title,
    };
  } catch (err) {
    console.error(`your error is :  ${err}`);
    throw err;
  }
};

export async function loadSearchResults(searchFor) {
  try {
    state.search.query = searchFor;
    const { data } = await getJSON(`${API_URL}?search=${searchFor}`);
    const { recipes } = data;

    state.search.results = recipes.map(function (v, i, a) {
      return {
        id: v.id,
        title: v.title,
        publisher: v.publisher,
        image: v.image_url,
      };
    });
    if (state.search.results.length == 0) {
      throw new Error('There are no recipes for this search');
    } else {
      return state.search.results;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
