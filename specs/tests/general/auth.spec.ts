import * as supertest from "supertest";
import { createRandomTourUser, tourUserCreateBody } from "../../../data/user";
import { deleteUser, createUser, loginUser } from "../../../data/helpers";

const request = supertest("localhost:8001/api/v1");

describe("USER LOGIN", () => {  
  describe("POSITIVE", () => {
    let signupRes: any, loginRes: any
    beforeAll(async() => {
        signupRes = await createUser(tourUserCreateBody)

        loginRes = await loginUser(tourUserCreateBody.email, tourUserCreateBody.password)
    });

    it("verify header", () => {
      expect(loginRes.header["content-type"]).toContain("application/json");
    })
    
    it("verify response body status", () => {
      expect(loginRes.body.status).toBe("success");
    })

    it("verify signup email equal login emails", () => {
      expect(signupRes.body.data.user.email).toBe(
        loginRes.body.data.user.email
      );
    });

    afterAll(async()=>{
      await deleteUser(loginRes).then((res) =>{
        expect(res.statusCode).toBe(204)
        expect(res.body).toEqual({})
       
    })

      await loginUser(tourUserCreateBody.email, tourUserCreateBody.password).then(res=>{
        expect(res.statusCode).toBe(401)
      })
    })
  });

  describe("NEGATIVE with invalid email", () => {
    let res;
    beforeAll(async() => {
      res = await loginUser(tourUserCreateBody.email+'1', tourUserCreateBody.password+"1")
    })

    it('verify response status', () => {
      expect(res.statusCode).toBe(401)
    });

    it("verify response message", () => {
      expect(res.body.message).toBe('Incorrect email or password')
    });

    it("verify response error", () => {
      expect(res.body.error).toMatchObject({statusCode: 401, status: 'fail'})
    });
  });
});
