const request = require("supertest");

const app = require("../app");

describe("Students API", () => {
  it("GET /students --> array students", () => {
    return request(app)
      .get("/students")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /students/id --> specific student by ID", () => {
    return request(app)
      .get("/students/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /students/id --> 404 if not found", () => {
    return request(app).get("/students/999999").expect(404);
  });

  it("POST /students --> created student", () => {
    return request(app)
      .post("/students")
      .send({
        name: "do dishes",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "do dishes",
            completed: false,
          })
        );
      });
  });
  it("POST /students --> validates request body", () => {
    return request(app).post("/students").send({ name: 123 }).expect(422);
  });
});
