class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room, isAdmin) {
        const user = {id, name, room, isAdmin};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room) {
        const users = this.users.filter((user) => user.room === room);
        return namesArray = users.map((user) => user.name);
    }

    getAllUsers() {
        const users = this.users.filter((user) => user.isAdmin === false);
        return allUsersArray = users.map((user) => user.room);
    }
}

module.exports = {Users};
