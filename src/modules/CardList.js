
//Контейнер с карточками
export default class CardList {
  constructor(container, cardElement, api) { //передаём  шаблон карточки
    this.container = container;
    this.cardElement = cardElement;
    this.api = api;
  }

  //создаёт карточку
  addCard(name, link) {
    const card = this.cardElement.create(name, link); //из шаблона делаем DOM-элемент
    this.container.insertAdjacentHTML("beforeend", card); //добавляем карточку в cardList
  }


  render(path) {
    this.api
      .get(path)
      .then(cards => {
        cards.forEach(card => {
          this.addCard(card.name,
            card.link);
        });
      });
  }

}