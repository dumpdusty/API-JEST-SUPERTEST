
import { deleteUser } from "../../../helpers/userHelper";

import {
  createRandomTour,
  createRequiredRandomTour,
  diffArray,
  tourCreate, tourDelete, tourGetAll
} from "../../../helpers/tourHelper";


describe("TOUR CREATE", () => {
  let afterAllRes: any, data: any =[]
  data.push(process.env.COOKIE)

  describe("create normal tour", () => {
    let res: any
    
    beforeAll(async () => {
      const randomTourBody = createRandomTour();
      res = await tourCreate(data, randomTourBody);
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
      expect(diffArray).toContain(res.body.data.data.difficulty);
    });
  });

  describe("create tour-required only", () => {
    let res: any
    beforeAll(async () => {
      const randomRequiredTourBody = createRequiredRandomTour(); 
      res = await tourCreate(data,randomRequiredTourBody)
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
        expect(diffArray).toContain(res.body.data.data.difficulty);
      });
  });
  
  afterAll(async() => {
    afterAllRes = await tourGetAll(data)

    // console.log(afterAllRes.body.data.data, 'ALL TOURS BEFORE');

    for (let i = 0; i < afterAllRes.body.data.data.length; i++) {
      await tourDelete(data, afterAllRes.body.data.data[i]._id)
    }

    afterAllRes = await tourGetAll(data)

    await deleteUser(data);

    // console.log(afterAllRes.body.data.data, 'ALL TOURS AFTER');
  })
});