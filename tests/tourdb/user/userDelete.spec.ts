import { createRandomUserBody } from "../../../helpers/userHelper";
import { deleteUser, createUser, getAllUsers } from '../../../helpers/userHelper' 

describe("DELETE USER", () => {
  describe("positive", () => {
    let res: any, cookie: any;
    const userCreateBody = createRandomUserBody();

    beforeAll(async () => {
     await createUser(userCreateBody).then(res => {
      cookie = res.header["set-cookie"];
     })

      res = await deleteUser(cookie)
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(204);
    });
    
    it("verify response body", async () => {
      expect(res.body).toEqual({});
    });
  });
});
