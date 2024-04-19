require('dotenv').config()

let data = []

const { createRandomUserBody, createUser, deleteUser } = require('./helpers/userHelper')

const randomUserBody = createRandomUserBody()

module.exports = async() => {
    const createRes = await createUser(randomUserBody)
        process.env.COOKIE = createRes.res.headers["set-cookie"]

        data.push(process.env.COOKIE)
}

// TODO add ater hook to delete all users - impossible due to incorrect API call for delete user