'use strict';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );
    const data = await response.json();
    if (!response.ok) {
      alert(
        `please try a new ID, this one does not exist! Code : ${response.status}`
      );
      throw new Error('This ID does not exist!');
    }
    //we use let here because we want to make a new object completely, restructuring the formatting from the API
    const { recipe } = data.data;
    //get recipe, from the data object
    // console.log(recipe);

    state.recipe = {
      //over here what we actually did is assign the state variable which we export
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
