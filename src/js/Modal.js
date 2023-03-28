/* eslint-disable class-methods-use-this */
export default class Modal {
  constructor() {
    this.elem = this.create();
    this.input = this.elem.querySelector('.modal__input');
    this.button = this.elem.querySelector('.modal__button');
  }

  static get markup() {
    return `
      <form class="modal__form">
        <h1 class="modal__title">Выберите никнейм</h1>
        <input class="modal__input" type="text">
        <button class="modal__button">Продолжить</button>
      </form>
    `;
  }

  create() {
    const modal = document.createElement('dialog');
    modal.classList.add('modal');

    const modalBody = Modal.markup;
    modal.insertAdjacentHTML('beforeend', modalBody);

    return modal;
  }

  show() {
    document.querySelector('.chat').append(this.elem);
    this.elem.show();
  }

  hide() {
    this.elem.close();
  }
}
