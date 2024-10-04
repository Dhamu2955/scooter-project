const User = require('../src/User')
const { describe, it, test, expect } = require("@jest/globals");
const correctuser = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('throws error for non string username', () => {
    expect( () => {
      const nonStringUsername = new User(123, 'test123', 21)
    }).toThrow("username should be a string")
  })

  test("private username correctly created", () => {
    expect(correctuser.username).toBe("Joe Bloggs")
  })


  // test password
  test("private password correctly created", () => {
    expect(correctuser.password).toBe("test123")
  })


  // test age
  test('throws error for non-number age', () => {
    expect(() => {
      new User('Joe Bloggs', 'test123', "twenty");
    }).toThrow("age must be a non-negative number"); // Adjust the message based on your error handling
  });

  test('throws error for negative-number age', () => {
    expect(() => {
      new User('Joe Bloggs', 'test123', -20);
    }).toThrow("age must be a non-negative number"); // Adjust the message based on your error handling
  });

  test("private username correctly created", () => {
    expect(correctuser.age).toBe(21)
  })

})

// test login
describe("Login Test", () => {
  test("incorrect password throws error", () =>{
    expect(() =>{
      correctuser.logIn("test12345")
    }).toThrow("incorrect password")
  })
  test("Login Works", () => {
    correctuser.logIn('test123');
    expect(correctuser.loggedIn).toBe(true);
  });
})

// test logout
describe("Logout Test", () => {
  test("User log out works", () => {
    correctuser.logIn('test123');
    correctuser.logOut();
    expect(correctuser.loggedIn).toBe(false);
  });
})