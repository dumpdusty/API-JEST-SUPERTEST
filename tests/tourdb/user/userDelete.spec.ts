import * as supertest from "supertest";
import { createRandomUserBody } from "../../../helpers/userHelper";
import { deleteUser, createUser, getAllUsers } from '../../../helpers/userHelper' 

const request = supertest("localhost:8001/api/v1");

describe("DELETE USER", () => {
  describe("positive", () => {
    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody();

    beforeAll(async () => {
     await createUser(userCreateBody).then(res => {
      cookie = res.header["set-cookie"];
     })

      res = await deleteUser(cookie)

    //   console.log(resDeleteUser.body);
      
    //   console.log(resDeleteUser.statusCode);
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(204);
    });
    
    it("verify response body", async () => {
      expect(res.body).toEqual({});
    });
  });
});
