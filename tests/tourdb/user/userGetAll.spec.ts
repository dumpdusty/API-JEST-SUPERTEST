import * as supertest from "supertest";
import { createRandomTourUser } from "../../../data/user";
import { deleteUser, createUser, loginUser } from "../../../data/helpers";

const request = supertest("localhost:8001/api/v1");

describe("GET ALL USERS", () => {
  describe("positive", () => {
    let resCreateUser: any, resGetAll: any, cookie: any;
    const userCreateBody = createRandomTourUser();

    beforeAll(async () => {
      resCreateUser = await createUser(userCreateBody);

      cookie = resCreateUser.header["set-cookie"];

      resGetAll = await request.get("/users").set("Cookie", cookie);
    });

    afterAll(async () => {
        await request
          .delete("/users/deleteMe")
          .set("Cookie", cookie);
      });

    it("verify response status", async () => {
      expect(resGetAll.body.status).toBe("success");
    });

    it("verify response statusCode", async () => {
      expect(resGetAll.statusCode).toBe(200);
    });
   
  });
});
