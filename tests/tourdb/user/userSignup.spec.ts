import * as supertest from "supertest";
import { createRandomUserBody, createUser } from "../../../helpers/userHelper";

const request = supertest("localhost:8001/api/v1");

describe("USER SIGN UP", () => {
  describe("POSITIVE TESTS", () => {
    let res: any;
    const randomUserBody = createRandomUserBody()
    beforeAll(async () => {
      res = await createUser(randomUserBody);
    })

    it("verify user name", async () => {
      expect(res.body.data.user.name).toBe(randomUserBody.name);
    });

    it("verify user email", async () => {
      expect(res.body.data.user.email).toBe(randomUserBody.email);
    });

    it("verify token exist", async () => {
      expect(res.body.token).toBeDefined();
    });

    it("veriy type of token", async () => {
      expect(typeof res.body.token).toBe("string");
    });
  });

  // long version / refactored below
  /*
  describe("NEGATIVE TESTS - long version", () => {

    // could not be executes as there is a bug in app
    it.skip("should not create a user with existing email", async () => {
      await request.post("/users/signup").send(tourUserCreateBody).expect(201);

      await request
        .post("/users/signup")
        .send(tourUserCreateBody)
        .then((resp) => {
          expect(resp.body.message).toBe(
            `E1100 duplicate key error collections: test.users index: email_1 dup key: { email: "${tourUserCreateBody.email}"}`
          );
        });
    });

    it("should not create a user w/o name", async () => {
      await request
        .post("/users/signup")
        .send({
          email: tourUserCreateBody.email,
          password: tourUserCreateBody.password,
          passwordConfirm: tourUserCreateBody.passwordConfirm,
        })
        .expect(500)
        .then((res) => {
          expect(res.body.error._message).toBe("User validation failed");
          expect(res.body.error.errors.name.message).toBe("Please tell us your name!");
        });
    });

    it("should not create a user w/o email", async () => {
        await request
          .post("/users/signup")
          .send({
            name: tourUserCreateBody.name,
            password: tourUserCreateBody.password,
            passwordConfirm: tourUserCreateBody.passwordConfirm,
          })
          .expect(500)
          .then((res) => {
            expect(res.body.error._message).toBe("User validation failed");
            expect(res.body.error.errors.email.message).toBe("Please provide your email");
          });
      });

      it("should not create a user w/o password", async () => {
        await request
          .post("/users/signup")
          .send({
            name: tourUserCreateBody.name,
            email: tourUserCreateBody.email,
            passwordConfirm: tourUserCreateBody.passwordConfirm,
          })
          .expect(500)
          .then((res) => {
            expect(res.body.error._message).toBe("User validation failed");
            expect(res.body.error.errors.password.message).toBe("Please provide a password");
          });
      });

      it("should not create a user w/o passwordConfirm", async () => {
        await request
          .post("/users/signup")
          .send({
            name: tourUserCreateBody.name,
            email: tourUserCreateBody.email,
            password: tourUserCreateBody.password,
          })
          .expect(500)
          .then((res) => {
            expect(res.body.error._message).toBe("User validation failed");
            expect(res.body.error.errors.passwordConfirm.message).toBe("Please confirm your password");
          });
      });
  });
*/

  describe('NEGATIVE TESTS - short version', () => {
    const randomUserBody = createRandomUserBody()
    it('should not create a user w/o name', async () => {
      const userNoName = { ...randomUserBody, name: null }
      const res = await request
        .post("/users/signup")
        .send(userNoName)
        .expect(500)

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.name.message).toBe("Please tell us your name!");
    });

    it("should not create a user w/o email", async () => {
      const userNoEmail = { ...randomUserBody, email: null }
      const res = await request
        .post("/users/signup")
        .send(userNoEmail)
        .expect(500)

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.email.message).toBe("Please provide your email");
    });

    it("should not create a user w/o password", async () => {
      const userNoPass = { ...randomUserBody, password: null }
      const res = await request
        .post("/users/signup")
        .send(userNoPass)
        .expect(500)

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.password.message).toBe("Please provide a password");
    });


    it("should not create a user w/o passwordConfirm", async () => {
      const userNoPassConfirm = { ...randomUserBody, passwordConfirm: null }
      const res = await request
        .post("/users/signup")
        .send(userNoPassConfirm)
        .expect(500)
      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.passwordConfirm.message).toBe("Please confirm your password");
    });
  });
});