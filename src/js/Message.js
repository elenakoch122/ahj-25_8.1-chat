/* eslint-disable class-methods-use-this */
export default class Message {
  constructor(obj) {
    this.elem = this.create(obj);
  }

  create(obj) {
    const message = document.createElement('div');
    message.classList.add('chat__message');
    if (obj.user === 'You') {
      message.classList.add('your-message');
    }

    const messageInfo = document.createElement('div');
    messageInfo.classList.add('chat__message-info');
    messageInfo.textContent = `${obj.user}, ${obj.day} ${obj.time}`;

    const messageText = document.createElement('p');
    messageText.classList.add('chat__message-text');
    messageText.textContent = obj.message;

    message.append(messageInfo, messageText);

    return message;
  }
}
