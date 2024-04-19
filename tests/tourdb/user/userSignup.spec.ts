
import { createRandomUserBody, createUser, deleteUser, getAllUsers } from "../../../helpers/userHelper";

describe("USER SIGN UP", () => {
  let res: any, cookie: any
  const randomUserBody = createRandomUserBody()

  beforeAll(async () => {
    res = await createUser(randomUserBody);

    cookie = res.header["set-cookie"];
  });

  describe("POSITIVE TESTS", () => { 
    
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

  
  describe('NEGATIVE TESTS - short version', () => {
    it('should not create a user w/o name', async () => {
      const userNoName = { ...randomUserBody, name: null }
      const res = await createUser(userNoName)

      expect(res.statusCode).toEqual(500)
      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.name.message).toBe("Please tell us your name!");
    });

    it("should not create a user w/o email", async () => {
      const userNoEmail = { ...randomUserBody, email: null }
      const res = await createUser(userNoEmail)
      
      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.email.message).toBe("Please provide your email");
    });

    it("should not create a user w/o password", async () => {
      const userNoPass = { ...randomUserBody, password: null }
      const res = await createUser(userNoPass)

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.password.message).toBe("Please provide a password");
    });


    it("should not create a user w/o passwordConfirm", async () => {
      const userNoPassConfirm = { ...randomUserBody, passwordConfirm: null }
      const res = await createUser(userNoPassConfirm)

      expect(res.body.error._message).toBe("User validation failed");
      expect(res.body.error.errors.passwordConfirm.message).toBe("Please confirm your password");
    });
  });

  afterAll(async() => {
    res = await getAllUsers(cookie)

    // console.log(res.body.data.data, 'ALL TOURS BEFORE');

      await deleteUser(cookie).then(res => {
        expect(res.statusCode).toEqual(204)
      })
  });
});




  // long version / refactored above
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
