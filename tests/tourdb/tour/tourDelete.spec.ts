
import { createRandomTour, tourCreate, tourDelete } from "../../../helpers/tourHelper";

describe('DELETE TOUR POSITIVE', () => {

    let res: any, data: any =[], tourId: string;
    const randomTourBody = createRandomTour();

    beforeAll(async () => {
        data.push(process.env.COOKIE)
  
        tourId = (await tourCreate(data, randomTourBody)).body.data.data._id;

        res = await tourDelete(data, tourId)
      });

    it('verify response status', () => {
        expect(res.statusCode).toBe(204)
    });

    it('verify response body', () => {
        expect(res.body).toEqual({})
    });
});