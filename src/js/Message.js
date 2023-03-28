/* eslint-disable class-methods-use-this */
import moment from 'moment';

moment.locale('ru');

export default class Message {
  constructor(user, text) {
    this.elem = this.create(user, text);
  }

  create(user, text) {
    const message = document.createElement('div');
    message.classList.add('chat__message');

    const messageInfo = document.createElement('div');
    messageInfo.classList.add('chat__message-info');
    messageInfo.textContent = `${user}, ${moment().format('L')} ${moment().format('LT')}`;

    const messageText = document.createElement('p');
    messageText.classList.add('chat__message-text');
    messageText.textContent = text;

    message.append(messageInfo, messageText);

    return message;
  }
}
