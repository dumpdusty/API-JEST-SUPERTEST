
import * as userHelper from '../../../helpers/userHelper' 

describe("DELETE USER", () => {
  describe("positive", () => {
    let res: any, data: any =[]

    beforeAll(async () => {
      data.push(process.env.COOKIE)

      res = await userHelper.deleteUser(data)
    });

    it("verify response statusCode", async () => {
      expect(res.statusCode).toBe(204);
    });
    
    it("verify response body", async () => {
      expect(res.body).toEqual({});
    });
  });
});
