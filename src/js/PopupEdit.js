//Попап редактирования профиля
class PopupEdit extends Popup {
    constructor(container, user, api){
      super(container);
      this.api = api;
      this.user = user;
    }

    open(event) {
      super.open(event);
      
    }

    close(event) {
      super.close(event);
    }
   
    edit(path, event) {
      event.preventDefault();

        const name = this.form.elements.name;
        const about = this.form.elements.about;
        this.user.name = document.querySelector(".user-info__name");
        this.user.about = document.querySelector(".user-info__job");
        this.user.name.textContent = name.value;
        this.user.about.textContent = about.value;

      this.container.classList.remove("popup_is-opened");

      this.api.patchUserInfo(path, event).then(received => {
        this.user.name.textContent = received.name;
        this.user.about.textContent = received.about;
      });
  
    }
  }