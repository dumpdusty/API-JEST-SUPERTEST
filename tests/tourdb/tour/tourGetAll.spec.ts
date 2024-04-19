
import { deleteUser } from "../../../helpers/userHelper";
import { createRequiredRandomTour, tourCreate, tourGetAll, tourDelete } from "../../../helpers/tourHelper";


describe('GET ALL TOURS', () => {

    let res: any, data: any =[];
    data.push(process.env.COOKIE)

    beforeAll(async() => {
        for(let i=0; i < 4; i++){
            await tourCreate(data, createRequiredRandomTour())
        }

        res = await tourGetAll(data)  
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
            await tourDelete(data, res.body.data.data[i]._id)
          }

          await deleteUser(data);
    })
});