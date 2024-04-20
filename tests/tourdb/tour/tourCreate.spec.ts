
import * as userHelper from "../../../helpers/userHelper";

import * as tourHelper from "../../../helpers/tourHelper";


describe("TOUR CREATE", () => {
  let afterAllRes: any, data: any = []
  data.push(process.env.COOKIE)

  describe("create normal tour", () => {
    let res: any

    beforeAll(async () => {
      const randomTourBody = tourHelper.createRandomTour();
      res = await tourHelper.tourCreate(data, randomTourBody);
    });

    it("verify response status", async () => {
      expect(res.body.status).toBe("success");
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(201);
    });

    it("verify response statusCode", async () => {
      expect(typeof res.body.data.data.name).toBe("string");
    });

    it("verify response difficulty", async () => {
      expect(tourHelper.diffArray).toContain(res.body.data.data.difficulty);
    });
  });

  describe("create tour-required only", () => {
    let res: any
    beforeAll(async () => {
      res = await tourHelper.tourCreate(data, tourHelper.createRequiredRandomTour())
    });

    it("verify response status", async () => {
      expect(res.body.status).toBe("success");
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(201);
    });

    it("verify response statusCode", async () => {
      expect(typeof res.body.data.data.name).toBe("string");
    });

    it("verify response difficulty", async () => {
      expect(tourHelper.diffArray).toContain(res.body.data.data.difficulty);
    });
  });

  afterAll(async () => {
    afterAllRes = await tourHelper.tourGetAll(data)

    // console.log(afterAllRes.body.data.data, 'ALL TOURS BEFORE');

    for (let i = 0; i < afterAllRes.body.data.data.length; i++) {
      await tourHelper.tourDelete(data, afterAllRes.body.data.data[i]._id)
    }

    afterAllRes = await tourHelper.tourGetAll(data)

    await userHelper.deleteUser(data);

    // console.log(afterAllRes.body.data.data, 'ALL TOURS AFTER');
  })
});