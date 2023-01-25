class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
    signUp(body) { // регистрация
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    signIn(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    resetPass(inp1){
        return fetch(`${this.path}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inp1)
        });
    }
    resetPassOk(id, token){
        return fetch(`${this.path}/password-reset/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token)
        });
    }
    getProducts() {
        return fetch(`${this.path}/products`,{
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getProduct(id) {
       return fetch(`${this.path}/products/${id}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    getUsers(groupId) {
        return fetch(`${this.path}/v2/${groupId}`, {
             headers: {
                 authorization: `Bearer ${this.token}`
            }
        })
    }
}
 
export {Api};