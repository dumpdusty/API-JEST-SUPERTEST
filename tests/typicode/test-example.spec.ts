import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("POSTS", () => {
  it("postsGetAll", async () => {
    const res = await request.get("/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("postsCreate", async () => {
    const data = {
      title: "Post request",
      body: "This is my first post request",
      userId: 666,
    };

    const res = await request.post("/posts").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual("Post request");
  });

  it("postsModify async/await", async () => {
    const data = { title: "modify info" };

    const beforeTitle = (await request.get("/posts/1")).body.title;
    console.log(`---Title before = ${beforeTitle}----`);

    const res = await request.patch("/posts/1").send(data);
    console.log(`----Title after = ${res.body.title}----`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(data.title);
    expect(beforeTitle).not.toBe(data.title);
  });

  it("postsModify then", async () => {
    const data = { title: "modified info" };
    const beforeTitle = (await request.get("/posts/1")).body.title;
    console.log(`----Title before = ${beforeTitle}----`);
    await request
      .patch("/posts/1")
      .send(data)
      .then((response) => {
        console.log(`----${response.body.title}----`);
        expect(response.statusCode).toEqual(200);
        expect(beforeTitle).not.toBe(data.title);
      });
  });

  it.only("postsModify res/err", (done) => {
    const data = { title: "modified info" };

    let beforeTitle = null;
    request.get("/posts/1")
        .end((err, res) => {
        if (err) return done(err);
        beforeTitle = res.body.title;
        console.log(`---Title before = ${beforeTitle}----`);
    });
    
    // command below will be executed before any requests
    console.log(`++++++++++Title before = ${beforeTitle}+++++++++++`);
    
    request
      .patch("/posts/1")
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(`----Title before = ${beforeTitle}----`);
        // console.log(`----Title after = ${res.body.title}----`);
       
        
        expect(res.body.title).toEqual(data.title);
        expect(beforeTitle).not.toBe(data.title);
        done();
      });
  });

  it("postsDelete", async () => {
    const res = await request.delete("/posts/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});

// done should be called at the last command in the it???!!!!
