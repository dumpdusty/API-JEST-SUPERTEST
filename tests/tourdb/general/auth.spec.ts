import * as supertest from "supertest";
import { createRandomUserBody, deleteUser, createUser, loginUser } from "../../../helpers/userHelper";

const request = supertest("localhost:8001/api/v1");

describe("USER LOGIN", () => {
  let cookie: any;
  const randomUserBody = createRandomUserBody()

  describe("POSITIVE", () => {
    let signupRes: any, loginRes: any

    beforeAll(async () => {
      signupRes = await createUser(randomUserBody).then(res => {
        cookie = res.header["set-cookie"];
      })

      loginRes = await loginUser(randomUserBody.email, randomUserBody.password)
      });

      it("verify header", () => {
        expect(loginRes.header["content-type"]).toContain("application/json");
      })

      it("verify response body status", () => {
        expect(loginRes.body.status).toBe("success");
      })

      it("verify signup email equal login emails", () => {
        expect(randomUserBody.email).toBe(
          loginRes.body.data.user.email
        );
      });
    });

    describe("NEGATIVE with invalid credentials", () => {
      let res: any;

      beforeAll(async () => {
        res = await loginUser(randomUserBody.email + '1', randomUserBody.password + "1")
      })

      it('verify response status', () => {
        expect(res.statusCode).toBe(401)
      });

      it("verify response message", () => {
        expect(res.body.message).toBe('Incorrect email or password')
      });

      it("verify response error", () => {
        expect(res.body.error).toMatchObject({ statusCode: 401, status: 'fail' })
      });
    });

    afterAll(async () => {
      await deleteUser(cookie).then((res) => {
        expect(res.statusCode).toBe(204)
        expect(res.body).toEqual({})

      })

      await loginUser(randomUserBody.email, randomUserBody.password).then(res => {
        expect(res.statusCode).toBe(401)
      })
    })
  });
