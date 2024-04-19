import 'dotenv/config'

import { createRandomUserBody, createUser } from './helpers/userHelper'

const randomUserBody = createRandomUserBody()

before(async() => {
    await createUser(randomUserBody).then(res => {
        process.env.COOKIE = res.header["set-cookie"];
      })
      console.log(process.env.COOKIE);
});