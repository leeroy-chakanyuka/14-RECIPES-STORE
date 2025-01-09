'use strict';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();
    if (!response.ok) {
      alert(
        `please try a new ID, this one does not exist! Code : ${response.status}`
      );
      throw new Error('This ID does not exist!');
    }
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
