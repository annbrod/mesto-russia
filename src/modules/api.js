export default class Api {
  constructor(options) {
    this.url = options.url
    this.headers = options.headers
    this.ownerId = options.ownerId;
  }

  //Получаем информацию с сервера
  get(path) {
    return fetch(`${this.url}${path}`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так ${res.status}`)
      })
  }


  patchUserInfo(path, event) {
    return fetch(`${this.url}${path}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: event.currentTarget.elements.name.value,
        about: event.currentTarget.elements.about.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
  }
};




