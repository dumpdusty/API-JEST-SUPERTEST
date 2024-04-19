require('dotenv').config()
const request = require('supertest')
var Chance = require('chance');
var chance = new Chance();

module.exports = async() => {
    const response = await request(process.env.BASE_URL)
        .post('/users/signup')
        .send({
            name: chance.name(),
            email: chance.email({ domain: "pirate.com" }),
            password: "Pirate666!",
            passwordConfirm: "Pirate666!"
        });
        process.env.COOKIE = response.res.headers["set-cookie"]
}

// TODO add ater hook to delete all users
// and it will cover userSignup after all hook as well
// TODO fix failed CI run for upload.spec.js