import * as supertest from "supertest";
import { createRandomUserBody, createUser, getAllUsers,deleteUser } from "../../../helpers/userHelper";

import {
  createRandomTour,
  createRequiredRandomTour,
  diffArray,
  tourCreate, tourDelete, tourGetAll
} from "../../../helpers/tourHelper";

// const chance = require("chance").Chance();

// const request = supertest("localhost:8001/api/v1");

let cookie: any; /*[x:string] - this doesn't work - reason unknown*/

describe("TOUR CREATE", () => {
  let afterAllRes: any
  describe("create normal tour", () => {

    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody();
    const randomTourBody = createRandomTour();
    
    beforeAll(async () => {
      await createUser(userCreateBody).then((res) => {
        expect(res.statusCode).toBe(201);
        cookie = res.header["set-cookie"];
      });

      res = await tourCreate(cookie, randomTourBody);
        
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

    afterAll(async() => {
      afterAllRes = await tourGetAll(cookie)
  
      console.log(afterAllRes.body.data.data, 'ALL TOURS BEFORE');

      for (let i = 0; i < afterAllRes.body.data.data.length; i++) {
        await tourDelete(cookie, afterAllRes.body.data.data[i]._id)
      }

      afterAllRes = await tourGetAll(cookie)

      console.log(afterAllRes.body.data.data, 'ALL TOURS AFTER');
    })
  });

  describe("create tour-required only", () => {

    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody()
    const randomRequiredTourBody = createRequiredRandomTour();

    
    beforeAll(async () => {
      await createUser(userCreateBody).then((res) => {
        expect(res.statusCode).toBe(201);
        cookie = res.header["set-cookie"];
      });
      
      res = await tourCreate(cookie,randomRequiredTourBody)
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
      
      afterAll(async() => {
        afterAllRes = await tourGetAll(cookie)
    
        console.log(afterAllRes.body.data.data, 'ALL TOURS BEFORE');
  
        for (let i = 0; i < afterAllRes.body.data.data.length; i++) {
          await tourDelete(cookie, afterAllRes.body.data.data[i]._id)
        }
  
        afterAllRes = await tourGetAll(cookie)
  
        console.log(afterAllRes.body.data.data, 'ALL TOURS AFTER');
      })
  });
});


// TODO create delete tour spec
// TODO create afterAll hook with delete all users and tours in each spec