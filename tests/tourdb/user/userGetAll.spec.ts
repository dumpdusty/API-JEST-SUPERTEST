
import { createRandomUserBody } from "../../../helpers/userHelper";
import { deleteUser, createUser, getAllUsers } from '../../../helpers/userHelper' 

describe("GET ALL USERS", () => {
  describe("positive", () => {
    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody();

    beforeAll(async () => {
     await createUser(userCreateBody).then((res) => {
      cookie = res.header["set-cookie"];
     })

      res = await getAllUsers(cookie)
    });

    it("verify response status", async () => {
      expect(res.body.status).toBe("success");
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(200);
    });
   
    afterAll(async () => {
      await deleteUser(cookie)
    });
  });
});
