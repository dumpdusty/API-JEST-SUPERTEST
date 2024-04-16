import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

//TODO create before hooks

describe("POSTS", () => {
  describe("GetAll request", () => {
    it("verify response status code", async () => {
      const res = await request.get("/posts");

      expect(res.statusCode).toEqual(200);
    });

    it("verify response body id", async () => {
      const res = await request.get("/posts");

      expect(res.body[0].id).toEqual(1);
    });

    it("verify res body length", async () => {
      const res = await request.get("/posts");
      console.log(`Response body length is ${res.body.length}`);

      expect(res.body).toHaveLength(100);
    });

    it("verify res contain array", async () => {
      const res = await request.get("/posts");
      console.log(`Response body length is ${res.body.length}`);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  describe("CREATE request", () => {
    it("verify response status code", async () => {
      const res = await request.post("/posts").send({
        userId: 666,
        name: "Dusty",
        lastName: "Dump",
        age: "85",
        status: "pirate",
      });

      expect(res.statusCode).toEqual(201);
    });

    it("verify response body", async () => {
      const res = await request.post("/posts").send({
        userId: 666,
        name: "Dusty",
        lastName: "Dump",
        age: "85",
        status: "pirate",
      });

      expect(res.body.name).toEqual("Dusty");
      expect(res.body.lastName).toEqual("Dump");
      expect(res.body.age).toEqual("85");
    });
  });

  describe("GetById request", () => {
    function postsGetById(id = 2) {
      return request.get(`/posts/${id}`);
    }

    it("verify response status code", async () => {
      const res = await postsGetById();
      expect(res.statusCode).toEqual(200);
    });

    it("verify id by defailt", async () => {
      const res = await postsGetById();
      expect(res.body.id).toEqual(2);
    });

    it("verify random id", async () => {
      const randomId = 44;
      const res = await postsGetById(randomId);
      expect(res.body.id).toEqual(randomId);
    });
  });

  describe("UPDATE request", () => {
    function postsUpdate(id = 2) {
      return request.put(`/posts/${id}`).send({
        name: "Jack",
        lastname: "Sparrow",
        title: "captain",
      });
    }

    it("verify response status code", async () => {
      const res = await postsUpdate();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response body", async () => {
      const res = await postsUpdate();
      expect(res.body.name).toEqual("Jack");
      expect(res.body.lastname).toEqual("Sparrow");
      expect(res.body.title).toEqual("captain");
    });
  });

  describe("DELETE request", () => {
    function postsDelete(id = 2) {
      return request.delete(`/posts/${id}`);
    }

    it("verify response status code", async () => {
      const res = await postsDelete();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response retirn empty object", async () => {
      const res = await postsDelete();
      expect(res.body).toMatchObject({});
    });
  });

  describe("MODIFY request", () => {
    function postsModify(object = { userId: 666 }, id = 2) {
      return request.patch(`/posts/${id}`).send(object);
    }

    it("verify response status code", async () => {
      const res = await postsModify();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response updated default property", async () => {
      const res = await postsModify();
      expect(res.body.userId).toEqual(666);
    });

    it("verify response updated random property", async () => {
      const randomObject = { userId: 999 };
      const res = await postsModify(randomObject);
      expect(res.body.userId).toEqual(randomObject.userId);
    });
  });
});
