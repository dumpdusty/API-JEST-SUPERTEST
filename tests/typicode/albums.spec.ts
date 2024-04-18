import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

//TODO create before hooks

describe("ALBUMS", () => {
  describe("GetAll request", () => {
    it("verify response status code", async () => {
      const res = await request.get("/albums");

      expect(res.statusCode).toEqual(200);
    });

    it("verify response body id", async () => {
      const res = await request.get("/albums");

      expect(res.body[0].id).toEqual(1);
    });

    it("verify res body length", async () => {
      const res = await request.get("/albums");
      console.log(`Response body length is ${res.body.length}`);

      expect(res.body).toHaveLength(100);
    });
  });
  describe("CREATE request", () => {
    it("verify response status code", async () => {
      const res = await request.post("/albums").send({
        name: "Dusty",
        lastName: "Dump",
        text: "Sit est nostrum similique incidunt autem et soluta.",
        status: "published",
      });

      expect(res.statusCode).toEqual(201);
    });

    it("verify response body", async () => {
      const res = await request.post("/albums").send({
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
      return request.get(`/albums/${id}`);
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
      expect(res.body).toHaveProperty('title');
    });
  });

  describe("UPDATE request", () => {
    function albumsUpdate(id = 2) {
      return request.put(`/albums/${id}`).send({
        name: "Jack",
        lastname: "Sparrow",
        title: "captain",
      });
    }

    it("verify response status code", async () => {
      const res = await albumsUpdate();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response body", async () => {
      const res = await albumsUpdate();
      expect(res.body.name).toEqual("Jack");
      expect(res.body.lastname).toEqual("Sparrow");
      expect(res.body.title).toEqual("captain");
    });
  });

  describe("DELETE request", () => {
    function albumsDelete(id = 2) {
      return request.delete(`/albums/${id}`);
    }

    it("verify response status code", async () => {
      const res = await albumsDelete();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response retirn empty object", async () => {
      const res = await albumsDelete();
      expect(res.body).toMatchObject({});
    });
  });

  describe("MODIFY request", () => {
    function albumsModify(object = { userId: 666 }, id = 2) {
      return request.patch(`/albums/${id}`).send(object);
    }

    it("verify response status code", async () => {
      const res = await albumsModify();
      expect(res.statusCode).toEqual(200);
    });

    it("verify response updated default property", async () => {
      const res = await albumsModify();
      expect(res.body.userId).toEqual(666);
    });

    it("verify response updated random property", async () => {
      const randomObject = { userId: 999 };
      const res = await albumsModify(randomObject);
      expect(res.body.userId).toEqual(randomObject.userId);
    });
  });
});
