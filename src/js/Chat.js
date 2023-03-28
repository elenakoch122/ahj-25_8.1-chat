import Message from './Message';
import Modal from './Modal';

export default class Chat {
  constructor() {
    this.elem = document.querySelector('.chat');
    this.modal = new Modal();
    this.usersOnline = [];
    this.youUser = null;
    this.input = null;

    this.addUser = this.addUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  static get chatBody() {
    return `
      <ul class="chat__users-list"></ul>

      <section class="chat__space">
        <div class="chat__messages"></div>

        <form class="chat__footer">
          <input class="chat__footer-input" type="text">
          <button class="chat__footer-send-button">&#10149;</button>
        </form>
      </section>
    `;
  }

  init() {
    this.modal.show();

    this.elem.addEventListener('submit', this.addUser);
    this.elem.addEventListener('submit', this.sendMessage);
  }

  addUser(e) {
    if (!e.target.classList.contains('modal__form')) return;

    e.preventDefault();

    const user = this.modal.input.value;
    const isUserFree = this.checkUser(user);

    if (!isUserFree) {
      this.errorMessage();
      return;
    }

    this.youUser = user;
    this.usersOnline.push(this.youUser);
    this.modal.hide();

    const { chatBody } = Chat;
    this.elem.insertAdjacentHTML('afterbegin', chatBody);

    this.showUsers();

    this.input = this.elem.querySelector('.chat__footer-input');
  }

  checkUser(user) {
    return this.usersOnline.every((u) => u !== user);
  }

  showUsers() {
    this.usersOnline.forEach((u) => {
      const user = document.createElement('li');
      user.className = 'chat__users-item user';
      user.textContent = u;

      const avatar = document.createElement('div');
      avatar.classList.add('user__avatar');

      user.prepend(avatar);
      document.querySelector('.chat__users-list').append(user);
    });
  }

  sendMessage(e) {
    if (!e.target.classList.contains('chat__footer')) return;

    e.preventDefault();
    const message = new Message('You', this.input.value);
    message.elem.classList.add('your-message');
    this.elem.querySelector('.chat__messages').append(message.elem);
    this.input.value = '';
  }
}
