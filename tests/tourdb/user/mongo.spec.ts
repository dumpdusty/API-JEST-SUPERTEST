const { MongoClient, ObjectId } = require('mongodb');

import * as userHelper from "../../../helpers/userHelper";

const DATABASE_URL = 'mongodb+srv://dd-db:Pirate666@cluster0.ceru8ed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(DATABASE_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('insert', async () => {
        // get all users from database
        const users = db.collection('users');
        const user = await users.findOne({ name: 'Nicolas Cole' })

        expect(user.name).toEqual('Nicolas Cole');

    });

    it('verify user in mongodb', async () => {
        // create user
        const user = (await userHelper.createUser(userHelper.createRandomUserBody())).body.data.user

        //get all users from database
        const users = db.collection('users');

        // git single user
        const userData = await users.findOne({ name: user.name })

        if (!userData) {
            throw new Error('User not found')
        }

        expect(user.name).toEqual(userData.name);

        expect(user.email).toEqual(userData.email);

        //delete created user
        await users.deleteOne({ _id: new ObjectId(userData._id) })

        let findUser = await users.findOne({ _id: userData._id })

        expect(findUser === null).toBeTruthy();
    });
});