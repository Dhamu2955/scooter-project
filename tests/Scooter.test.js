const Scooter = require('../src/Scooter')
const ScooterApp = require('../src/ScooterApp')
const User = require("../src/User")

const scooterApp = new ScooterApp()
const scooter = new Scooter("station1")
const scooter2 = new Scooter("station1")
const scooterLowCharge = new Scooter("station1")
const scooterBroken = new Scooter("station1")
const scooterRent = new Scooter("station1")
const testUser = new User("Test", "test", 18)


// typeof scooter === object
describe("scooter initalised correctly", () => {
  test("Scooter class should create Scooter instance", () => {
    expect(scooter).toBeInstanceOf(Scooter)
  })
  test("scooter station = station", () => {
    expect(scooter.station).toBe("station1")
  })
  test("scooter user = null", () => {
    expect(scooter.user).toBe(null)
  })
  test("first scooter serial = 1", () => {
    expect(scooter.serial).toBe(1)
  })
  test("scooter charge = 100", () => {
    expect(scooter.charge).toBe(100)
  })
  test("scooter broken = false", () => {
    expect(scooter.isBroken).toBe(false)
  })
  test("second scooter has serial = 2", () => {
    expect(scooter2.serial).toBe(2)
  })
})

// Method tests
describe('scooter methods', () => {

  // rent method

  test('throws error for scooter Charge = 20', () => {
    scooterLowCharge.charge = 20
    expect( () => {
      scooterLowCharge.rent(testUser)
    }).toThrow("scooter needs to charge")
  })

  test('throws error for scooter Charge 1', () => {
    scooterLowCharge.charge = 1
    expect( () => {
      scooterLowCharge.rent(testUser)
    }).toThrow("scooter needs to charge")
  })

  test('throws error for isBroken = true', () => {
    scooterBroken.isBroken = true
    expect( () => {
      scooterBroken.rent(testUser)
    }).toThrow("scooter needs repair")
  })

  test("rent(user) sets station to null", () => {
    scooterRent.rent(testUser)
    expect(scooterRent.station).toBe(null)
  })

  test("rent(user) sets user to user", () => {
    expect(scooterRent.user).toBe(testUser)
  })

  // dock method

  test("dock(user) sets station to station", () => {
    scooterRent.dock("station1")
    expect(scooterRent.station).toBe("station1")
  })

  test("dock(user) sets user to null", () => {
    expect(scooterRent.user).toBe(null)
  })

  // requestRepair method

  // charge method

})
