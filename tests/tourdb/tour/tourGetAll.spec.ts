import * as supertest from "supertest";
import { createRandomUserBody } from "../../../helpers/userHelper";
import { createUser } from '../../../helpers/userHelper'
import { tourGetAll, tourDelete } from "../../../helpers/tourHelper";

const request = supertest("localhost:8001/api/v1");


describe('GET ALL TOURS', () => {

    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody()

    beforeAll(async() => {
        await createUser(userCreateBody).then(res => {
            expect(res.statusCode).toBe(201);

            cookie = res.header["set-cookie"];
        })

        res = await tourGetAll(cookie)
       
    })

    it('verify response status', async() => {
        expect(res.statusCode).toBe(200)

    });
    
    it('verify response contains array', async() => {
        expect(Array.isArray(res.body.data.data)).toBe(true)
    });
    
    it('verify each array element contain id', async() => {
        for(let i=0; i<res.body.data.data.length; i++){
            expect(res.body.data.data[i]).toHaveProperty('_id')
        }
    });

    it('verify id is not empty', async() => {
        for(let i=0; i<res.body.data.data.length; i++){
            expect(res.body.data.data[i]).not.toBe('')
        }
    });

    afterAll(async () => {
        for (let i = 0; i < res.body.data.data.length; i++) {
            await tourDelete(cookie, res.body.data.data[i]._id)
          }
    })

});