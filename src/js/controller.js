const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Getting the recipe from the API
async function showRecipe() {
  try {
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
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
    // console.log(recipe);
    // console.log(response);
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// console.log('here');

showRecipe();
