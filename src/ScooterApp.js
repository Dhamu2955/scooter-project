const Scooter = require("./Scooter")
const User = require("./User")

class ScooterApp {
  constructor(){
    this.stations = {
      station1 : [],
      station2 : [],
      station3 : [],
    }
    this.registeredUsers = {}
  }
  registerUser(username, password, age){
    if (age < 18){
        throw new Error("too young to register")
    } else if (this.registeredUsers[username]){
        throw new Error("already registered")
    } else {
        const user = this.registeredUsers[username] = new User(username, password, age)
        console.log("user has been registered")
        return user
    }
    }
    loginUser(username, password){
      const user = this.registeredUsers[username]
      if(user){
        user.logIn(password)
        console.log("user has been logged in")
      } else {
        throw new Error("Username or password is incorrect")
      }
    }
    logoutUser(username){
      const user = this.registeredUsers[username]
      if(user){
        if(user.loggedIn === false){
          throw new Error("no such user is logged in")
        } else {
          user.logOut()
        console.log("user is logged out")
        }
      }
    }
    createScooter(station){
      if (this.stations[station]){
        const newScooter = new Scooter(station)
        this.stations[station].push(newScooter)
        console.log("created new scooter")
        return newScooter
      } else {
        throw new Error("no such station")
      }
    }
    dockScooter(scooter, station){
      if (scooter.station !== null) {
        throw new Error("scooter is already at station")
      } else if (!this.stations[station]) {
        throw new Error("no such station")
      } else {
        scooter.dock(station)
        this.stations[station].push(scooter)
        console.log("scooter is docked")
      }
    }
    rentScooter(scooter, user){
      if(scooter.user !== null){
        throw new Error("scooter is rented")
      } else {
        const tempStation = scooter.station
        scooter.rent(user)
        console.log("Stations: ", this.stations);
        console.log("Scooter Station: ", scooter.station);
        this.stations[tempStation].splice((this.stations[tempStation].indexOf(scooter)), 1);
        console.log("scooted is rented")
      }
    }
    print() {
      console.log("Registered Users:");
      for (const username in this.registeredUsers) {
        console.log(`- ${username}`);
      }
      console.log("Stations and Scooter Count:");
      for (const station in this.stations) {
        const scooterCount = this.stations[station].length;
        console.log(`${station}: ${scooterCount} scooters`);
      }
    }
  }

module.exports = ScooterApp
