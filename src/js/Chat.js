import Message from './Message';
import Modal from './Modal';

export default class Chat {
  constructor(url) {
    this.elem = document.querySelector('.chat');
    this.modal = new Modal();
    this.url = url;
    this.usersOnline = [];

    this.addUser = this.addUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onWsOpen = this.onWsOpen.bind(this);
    this.onWsMessage = this.onWsMessage.bind(this);
    this.onWsError = this.onWsError.bind(this);
    this.onWsClose = this.onWsClose.bind(this);
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

  wssConnect() {
    this.wss = new WebSocket(`wss://${this.url}/ws`);
    this.wss.addEventListener('open', this.onWsOpen);
    this.wss.addEventListener('message', this.onWsMessage);
    this.wss.addEventListener('error', this.onWsError);
    this.wss.addEventListener('close', this.onWsClose);
  }

  onWsOpen(e) {
    console.log('ws open', e);
    this.wss.send(JSON.stringify({ type: 'register', nickname: this.youUser }));
  }

  onWsMessage(e) {
    const message = JSON.parse(e.data);

    if (message.type === 'users') {
      this.usersOnline = message.users;
      this.showUsers();
    }
  }

  onWsError(e) {
    console.log('ws error', e);
  }

  onWsClose(e) {
    console.log('ws close', e);
  }

  addUser(e) {
    if (!e.target.classList.contains('modal__form')) return;

    e.preventDefault();
    const user = this.modal.input.value;

    if (!user) {
      alert('Введите никнейм');
      return;
    }

    const isUserFree = this.checkUser(user);

    if (!isUserFree) {
      alert('Такой никнейм занят. Выберите другой');
      this.modal.input.value = '';
      return;
    }

    this.youUser = user;
    this.usersOnline.push(this.youUser);
    this.modal.hide();

    const { chatBody } = Chat;
    this.elem.insertAdjacentHTML('afterbegin', chatBody);

    this.showUsers();

    this.input = this.elem.querySelector('.chat__footer-input');
    this.wssConnect();
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
