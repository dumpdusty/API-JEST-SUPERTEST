import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

//TODO create before hooks

describe("COMMENTS", () => {
  describe("GetAll request", () => {
    it("verify response status code", async () => {
      const res = await request.get("/comments");

      expect(res.statusCode).toEqual(200);
    });

    it("verify response body id", async () => {
      const res = await request.get("/comments");

      expect(res.body[0].id).toEqual(1);
    });

    it("verify res body length", async () => {
      const res = await request.get("/comments");
      console.log(`Response body length is ${res.body.length}`);

      expect(res.body).toHaveLength(500);
    });
  });
  describe("CREATE request", () => {
    it("verify response status code", async () => {
      const res = await request.post("/comments").send({
        name: "Dusty",
        lastName: "Dump",
        text: "Sit est nostrum similique incidunt autem et soluta.",
        status: "published",
      });

      expect(res.statusCode).toEqual(201);
    });

    it("verify response body", async () => {
      const res = await request.post("/comments").send({
        name: "Dusty",
        lastName: "Dump",
        body: "Sit est nostrum similique incidunt autem et soluta.",
        status: "published",
      });

      expect(res.body.name).toEqual("Dusty");
      expect(res.body.lastName).toEqual("Dump");
      expect(res.body.status).toMatch("publ");
    });
  });

  describe("GetById request", () => {
    function postGetById(id = 2) {
      return request.get(`/comments/${id}`);
    }

    it("verify response status code", async () => {
      const res = await postGetById();
      expect(res.statusCode).toEqual(200);
    });

    it("verify id by defailt", async () => {
      const res = await postGetById();
      expect(res.body.id).toEqual(2);
    });

    it("verify random id", async () => {
      const randomId = 44;
      const res = await postGetById(randomId);
      expect(res.body.id).toEqual(randomId);
    });

    it("verify response has property text", async () => {
      const res = await postGetById();
      expect(res.body).toHaveProperty('body');
    });
  });

  describe("UPDATE request", () => {
    function commentsUpdate(id = 2) {
      return request.put(`/comments/${id}`).send({
        name: "Jack",
        lastname: "Sparrow",
        title: "captain",
      });
    }

    it("verify response status code", async () => {
      const res = await commentsUpdate();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response body", async () => {
      const res = await commentsUpdate();
      expect(res.body.name).toEqual("Jack");
      expect(res.body.lastname).toEqual("Sparrow");
      expect(res.body.title).toEqual("captain");
    });
  });

  describe("DELETE request", () => {
    function commentsDelete(id = 2) {
      return request.delete(`/comments/${id}`);
    }

    it("verify response status code", async () => {
      const res = await commentsDelete();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response retirn empty object", async () => {
      const res = await commentsDelete();
      expect(res.body).toMatchObject({});
    });
  });

  describe("MODIFY request", () => {
    function commentsModify(object = { userId: 666 }, id = 2) {
      return request.patch(`/comments/${id}`).send(object);
    }

    it("verify response status code", async () => {
      const res = await commentsModify();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response updated default property", async () => {
      const res = await commentsModify();
      expect(res.body.userId).toEqual(666);
    });

    it("verify response updated random property", async () => {
      const randomObject = { userId: 999 };
      const res = await commentsModify(randomObject);
      expect(res.body.userId).toEqual(randomObject.userId);
    });
  });
});
