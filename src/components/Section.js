export class Section {
  #renderer;
  #containerSelector;

  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#containerSelector = document.querySelector(containerSelector);
  }

  rendererItems(items) {
    items.forEach(item => this.#renderer(item));
  }

  addItem(element) {
    this.#containerSelector.prepend(element);
  }
}