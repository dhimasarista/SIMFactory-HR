class UserModel{
    constructor(){
        this.users = [{
            id: 2004,
            username: "ibmeong",
            password: "2902",
        }];
    }

    GetUserByID(id){
        for (let index = 0; index < this.users.length; index++) {
            if (this.users[index]["id"] === id) {
                return this.users[index];
            }
        }
        return null;
    }    
}

module.exports = UserModel;