'use strict';
import { API_URL } from './config';
import { async } from 'regenerator-runtime';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);
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
  }
};
