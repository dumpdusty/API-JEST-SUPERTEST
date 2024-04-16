const chance = require('chance').Chance()
import {User} from './interface'


// --------------------------------------------------------------------------
// function below contains unneccesary fileds  / reformatted below
/*
let password = createRandomUser().password

export function createRandomUser(){
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }

  export const userCreateBody = {
    name: createRandomUser().username.toLocaleLowerCase(),
    email: createRandomUser().email.toLowerCase(),
    password: password,
    passwordConfirm: password
}
*/
// -----------------------------------------------------------------------------

  export function createRandomTourUser(password = chance.string({length: 16})): User{
    return {
        name: chance.name(),
        email: chance.email({domain: "example.com"}),
        password: password,
        passwordConfirm: password
    }
  }

  export const tourUserCreateBody = createRandomTourUser()