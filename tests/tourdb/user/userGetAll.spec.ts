
import { createRandomUserBody } from "../../../helpers/userHelper";
import { deleteUser, createUser, getAllUsers } from '../../../helpers/userHelper' 

describe("GET ALL USERS", () => {
  describe("positive", () => {
    let res: any, data: any =[]

    beforeAll(async () => {      

    data.push(process.env.COOKIE)
    
      res = await getAllUsers(data)
    });

    it("verify response status", async () => {
      expect(res.body.status).toBe("success");
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(200);
    });
   
    afterAll(async () => {
      await deleteUser(data)
    });
  });
});
