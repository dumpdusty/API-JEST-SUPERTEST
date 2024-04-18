import * as supertest from "supertest";
import { createRandomTourUser } from "../../../data/user";
import { deleteUser, createUser, loginUser } from "../../../data/helpers";

const request = supertest("localhost:8001/api/v1");

describe("DELETE USER", () => {
  describe("positive", () => {
    let resCreateUser: any, resDeleteUser: any, cookie: any;
    const userCreateBody = createRandomTourUser();

    beforeAll(async () => {
      resCreateUser = await createUser(userCreateBody);

      cookie = resCreateUser.header["set-cookie"];

      resDeleteUser = await request.delete("/users/deleteMe").set("Cookie", cookie);

    //   console.log(resDeleteUser.body);
      
    //   console.log(resDeleteUser.statusCode);

      
    });

    it("verify response statusCode", async () => {
      expect(resDeleteUser.statusCode).toBe(204);
    });
    
    it("verify response body", async () => {
      expect(resDeleteUser.body).toEqual({});
    });

   
  });
});
