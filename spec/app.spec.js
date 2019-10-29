process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

describe("/api", () => {
  after(() => {
    return connection.destroy();
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
    describe("/:username", () => {
      it("GET-200: returns an user object for the specified username", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(response => {
            expect(response.body.user).to.be.an("object");
            expect(response.body.user).to.deep.equal({
              username: "icellusedkars",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
              name: "sam"
            });
          });
      });
      describe("/:username ERRORS", () => {
        it("/users/1: ERROR - GET request for invalid syntax for username returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/users/not-a-user")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                HTTP_Error: "404: Not Found",
                Message: "Valid Input Syntax But Does Not Exist"
              });
            });
        });
      });
    }); // END OF DESCRIBE /:username BLOCK
  }); // END OF DESCRIBE USERS BLOCK
  describe("/articles", () => {
    it("GET-200: returns all the articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.be.an("array");
          expect(response.body.articles[0]).to.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
        });
    });
  }); // END OF DESCRIBE ARTICLES BLOCK
}); // END OF DESCRIBE API BLOCK
