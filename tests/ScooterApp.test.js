const User = require('../src/User')
const Scooter = require("../src/Scooter")
const ScooterApp = require('../src/ScooterApp')

const scooterApp = new ScooterApp()
// ScooterApp tests here

// register user
describe('registerUser method tests', () => {
  test('Should return instance of User', () => {
    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })

  test('Underage User throws error', () => {
    expect(()=>{
      scooterApp.registerUser('Joey', 'test123', 12)
    }).toThrow("too young to register")
  })

  test('Already Resgistered throws error', () => {
    expect(()=>{
      scooterApp.registerUser('Joe Bloggs', 'test12345', 21)
    }).toThrow("already registered")
  })
})

  // log in
describe('login method tests', () => {
  test('Login method works - changes loggedIn to true', () => {
    scooterApp.registerUser("Joseph", "test12345", 21);
    scooterApp.loginUser("Joseph", "test12345")
    const user = scooterApp.registeredUsers["Joseph"]
    expect(user.loggedIn).toBe(true)
  })
  test('Wrong Username throws error', () => {
    scooterApp.registerUser('Joe', 'test12345', 21)
    expect(()=>{
      scooterApp.loginUser('Joey', 'test12345')
    }).toThrow("Username or password is incorrect")
  })
})

  // log out

describe('logout method tests', () => {
  test('Logout method works - changes loggedIn to false', () => {
    scooterApp.registerUser("Joseph123", "test12345", 21)
    scooterApp.loginUser("Joseph123", "test12345")
    scooterApp.logoutUser("Joseph123")
    const user = scooterApp.registeredUsers["Joseph123"]
    expect(user.loggedIn).toBe(false)
  })
  test('Logout throws error if user not logged in', () => {
    scooterApp.registerUser('Josephy', 'test12345', 21)
    expect(()=>{
      scooterApp.logoutUser('Josephy')
    }).toThrow("no such user is logged in")
  })
})

// rent scooter

describe('rent scooter method tests', () => {
  test("Renting an already rented scooter throws an error", () => {
    const scooter1 = scooterApp.createScooter("station1")
    scooterApp.registerUser("Johnny", "test", 45)
    scooterApp.rentScooter(scooter1, scooterApp.registeredUsers["Johnny"])
    expect(() => {
      scooterApp.rentScooter(scooter1, scooterApp.registeredUsers["Johnny"])
    }).toThrow("scooter is rented");
  })
})


// dock scooter

describe('dock scooter method tests', () => {
  const scooter2 = scooterApp.createScooter("station1")
  scooterApp.registerUser("Johnno", "j", 24)
  scooterApp.rentScooter(scooter2, scooterApp.registeredUsers["Johnno"])
  scooterApp.dockScooter(scooter2, "station2")
  test("Scooter is docked at correct station", () =>{
    expect(scooter2.station).toBe("station2")
    expect(scooter2.user).toBe(null)
  })
  test("Scooter is not assigned to user", () =>{
    expect(scooter2.user).toBe(null)
  })
  test("station contains scooter", () =>{
    expect(scooterApp.stations["station2"]).toContain(scooter2)
  })
  test("Docking thorws error if station does not exist", () =>{
    scooterApp.rentScooter(scooter2, scooterApp.registeredUsers["Johnno"])
    expect(()=>{
      scooterApp.dockScooter(scooter2, "station10")
    }).toThrow("no such station")
  })
})

// createScooter

describe('create scooter method tests', () => {
  test('Create scooter adds a new scooter to the station', () => {
    scooterApp.createScooter("station1")
    const stationScooters = scooterApp.stations["station1"]
    expect(stationScooters.length).toBeGreaterThan(0)
    expect(stationScooters[0]).toBeInstanceOf(Scooter)
  })

  test('Creating scooter at non-existent station throws error', () => {
    expect(() => {
      scooterApp.createScooter("station123")
    }).toThrow("no such station")
  })

})