import * as supertest from "supertest";
import { createRandomTourUser, tourUserCreateBody } from "../../../data/user";
import { deleteUser, createUser, loginUser } from "../../../data/helpers";
import {
  randomTourBody,
  randomRequiredTourBody,
  diffArray,
} from "../../../data/tour";

const chance = require("chance").Chance();

const request = supertest("localhost:8001/api/v1");

let cookie: any; /*[x:string] - this doesn't work - reason unknown*/

describe("TOUR", () => {
  describe("create normal tour", () => {

    let res: any, cookie: any;
    const userCreateBody = createRandomTourUser()
    
    beforeAll(async () => {
      await createUser(userCreateBody).then((res) => {

        // console.log(res.body)

        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toBe(userCreateBody.email);

        cookie = res.header["set-cookie"];
      });

      res = await request
        .post("/tours")
        .set("Cookie", cookie)
        .send(randomTourBody);

        // console.log(randomTourBody, '+++++++++++++++');
        

        // console.log(res.body, '====================');
        
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

    let res: any, cookie: any;
    const userCreateBody = createRandomTourUser()
    
    beforeAll(async () => {
      await createUser(userCreateBody).then((res) => {

        // console.log(res.body);
        
        expect(res.statusCode).toBe(201);
        expect(res.body.data.user.email).toBe(userCreateBody.email);
        cookie = res.header["set-cookie"];
      });
      
      res = await request
        .post("/tours")
        .set("Cookie", cookie)
        .send(randomRequiredTourBody);
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
});
