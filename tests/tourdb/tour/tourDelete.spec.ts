
import * as tourHelper from "../../../helpers/tourHelper";
import * as userHelper from "../../../helpers/userHelper";

describe('DELETE TOUR POSITIVE', () => {

    let res: any, data: any =[], tourId: string;
    const randomTourBody = tourHelper.createRandomTour();

    beforeAll(async () => {
        data.push(process.env.COOKIE)
  
        tourId = (await tourHelper.tourCreate(data, randomTourBody)).body.data.data._id;

        res = await tourHelper.tourDelete(data, tourId)
      });

    it('verify response status', () => {
        expect(res.statusCode).toBe(204)
    });

    it('verify response body', () => {
        expect(res.body).toEqual({})
    });

    afterAll(async() => {
        await userHelper.deleteUser(data)
    });
});