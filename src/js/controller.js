import * as model from './model';
import recipeView from './views/recipeView';

/////////////////////////////
// Controller
/////////////////////////////

const App = (function () {
  const addRecipeModal = document.querySelector('.add-recipe-window');
  const bookmarks = document.querySelector('.bookmarks');
  const body = document.querySelector('body');

  const init = function () {
    addRecipeModal.style.display = 'none';
    bookmarks.style.display = 'none';
    recipeView.addHandlerRender(controlRecipe);
  };

  const recipeContainer = document.querySelector('.recipe');

  const controlRecipe = async function () {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;
      recipeView.renderSpinner();

      // 1) loading the recipe

      await model.loadRecipe(id);

      // 2) rendering the recipe
      recipeView.render(model.state.recipe);
    } catch (err) {
      recipeView.renderError();
    }
  };

  return { controlRecipe, init };
})();

export { App };
