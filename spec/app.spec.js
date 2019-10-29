process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

describe("/api", () => {
  after(() => {
    connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  it("GET-200: sends a message welcoming the user to our application", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(response =>
        expect(response.body).to.deep.equal({
          message: "Welcome to Our News Website"
        })
      );
  });
  describe("/topics", () => {
    it("GET-200: returns all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body.topics[0]).to.have.keys("slug", "description");
        });
    });
  }); // END OF DESCRIBE TOPICS BLOCK
  describe("/users", () => {
    it("GET-200: returns all the users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(response => {
          expect(response.body.users).to.be.an("array");
          expect(response.body.users[0]).to.have.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
  }); // END OF DESCRIBE USERS BLOCK
}); // END OF DESCRIBE API BLOCK