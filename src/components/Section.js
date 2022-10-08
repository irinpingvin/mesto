export class Section {
  #items;
  #renderer;
  #containerSelector;

  constructor({items, renderer}, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#containerSelector = document.querySelector(containerSelector);
  }

  rendererItems() {
    this.#items.forEach(item => this.#renderer(item));
  }

  addItem(element) {
    this.#containerSelector.prepend(element);
  }
}