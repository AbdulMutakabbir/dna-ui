class Auth {
    constructor() {
        this.authentication = false;
    }

    login(callback) {
        this.authentication = true;
        callback();
    }

    logout(callback) {
        this.authentication = false;
        callback();
    }

    isAuthenticated() {
        return this.authentication;
    }
}

export default new Auth()