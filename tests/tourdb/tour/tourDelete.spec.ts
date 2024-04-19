
import { createRandomUserBody, createUser, deleteUser } from "../../../helpers/userHelper";
import { createRandomTour, tourCreate, tourDelete } from "../../../helpers/tourHelper";


describe('DELETE TOUR POSITIVE', () => {

    let res: any, cookie: any, tourId: string;
    const userCreateBody = createRandomUserBody();
    const randomTourBody = createRandomTour();

    beforeAll(async () => {
        await createUser(userCreateBody).then((res) => {
          expect(res.statusCode).toBe(201);
          cookie = res.header["set-cookie"];
        });
  
        tourId = (await tourCreate(cookie, randomTourBody)).body.data.data._id;

        res = await tourDelete(cookie, tourId)
        
      });

    it('verify response status', () => {
        expect(res.statusCode).toBe(204)
    });

    it('verify response body', () => {
        expect(res.body).toEqual({})
    });
});