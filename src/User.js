class User {
  #username
  #password
  #age
  constructor(username, password, age){
    if(typeof username !== "string"){
      throw new Error("username should be a string")
    }
    if (typeof age !== "number" || age < 0){
      throw new Error("age must be a non-negative number")
    }
    this.#username = username
    this.#password = password
    this.#age = age
    this.loggedIn = false
  }
  logIn(password){
    if (password === this.#password){
      this.loggedIn = true
    } else {
      throw new Error("incorrect password")
    }
  }
  logOut(){
    this.loggedIn = false
  }
  get username(){
    return this.#username
  }
  get password(){
    return this.#password
  }
  get age(){
    return this.#age
  }
}

module.exports = User
