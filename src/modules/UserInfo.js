export default class UserInfo {
    constructor(api, owner) {
        this.name = document.querySelector(".user-info__name");
        this.about = document.querySelector(".user-info__job");
        this.avatar = document.querySelector(".user-info__photo");
        this.api = api;
        this.owner = owner;
    }

    getUserInfo(path) {
        this.api.get(path).then(user => {
            this.owner.id = user._id;

            this.name.textContent = user.name;
            this.about.textContent = user.about;
            // this.avatar.style.backgroundImage = `url(${user.avatar})`;

        });
    }
}
