export const loader = (element) => {
  const loaderMarkup = `
  <div class="loader">
  <div class="loader__text">Loading</div>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>`;

  element.insertAdjacentHTML("afterbegin", loaderMarkup);
};

export const removeLoader = () => {
  const loader = document.querySelector('.loader');
  loader.remove();
};
