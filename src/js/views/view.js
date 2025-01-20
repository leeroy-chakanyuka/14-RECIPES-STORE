export default class View {
  //we're going to make this a generic view for all the others to inherit
  #message;
  #parentElement = document.querySelector('.recipe');
  #errorMessage = 'We could not find this recipe, please try another one!';

  addHandlerRender(callback) {
    window.addEventListener('load', callback);
    window.addEventListener('hashchange', () => {
      callback;
    });
  }
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = ` <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div> 
          `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
  renderError(message = this.#errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="src/img/${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this.#message) {
    const markup = `<div class="message">
                    <div>
                      <svg>
                        <use href="src/img/${icons}.svg#icon-smile"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div> 
        `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
