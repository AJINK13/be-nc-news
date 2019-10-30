process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
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
          expect(response.body.topics).to.have.length(3);
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
          expect(response.body.users).to.have.length(4);
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
        it("GET-404: GET request for valid syntax for username but the username does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/users/not-a-user")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: Valid Input Syntax But Does Not Exist"
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
          expect(response.body.articles).to.have.length(12);
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
    describe.only("/:article_id", () => {
      it("GET-200: returns an article object for the specified article_id along with comment_count key in the object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object");
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13"
            });
          });
      });
      it("PATCH-200: returns an article object for the specified article_id along with the votes property updated according to the patch request", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object");
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 200,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z"
            });
          });
      });
      it("PATCH-200: returns an article object for the specified article_id with the votes property not updated when inc_votes is not on the body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ not_inc_votes: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object");
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z"
            });
          });
      });
      describe("/:article_id ERRORS", () => {
        it("GET-404: GET request for valid syntax for username but the username does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: Valid Input Syntax But Does Not Exist"
              });
            });
        });
        it("GET-400: GET request for invalid syntax for username returns status 400 (Bad Request)", () => {
          return request(app)
            .get("/api/articles/abcdef")
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Bad Request: Invalid Input Syntax - Expected Integer"
              });
            });
        });
        it("PATCH-400: PATCH request for invalid syntax for inc_votes returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "not-a-number" })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Bad Request: Invalid Input Syntax - Expected Integer"
              });
            });
        });
        it("PATCH-400: PATCH request for multiple items on request body returns an error message explaining", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 100, not_inc_votes: 100 })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Bad Request: 'inc_votes: value' Must Be The Only Key-Value Pair On Request Body"
              });
            });
        });
      });
    }); // END OF DESCRIBE /:article_id
  }); // END OF DESCRIBE ARTICLES BLOCK
}); // END OF DESCRIBE API BLOCK
