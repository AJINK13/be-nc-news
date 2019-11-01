process.env.NODE_ENV = "test"
const { expect } = require("chai")
const request = require("supertest")
const chai = require("chai")
const chai_sorted = require("chai-sorted")
const app = require("../app.js")
const connection = require("../db/connection.js")
chai.use(chai_sorted)

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run()
  })
  after(() => {
    return connection.destroy()
  })
  it("GET-200: GET request sends a message welcoming the user to our application", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(response =>
        expect(response.body).to.deep.equal({
          Message: "Welcome to Our News Website"
        })
      )
  })
  describe("/topics", () => {
    it("GET-200: GET request returns an array of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body.topics).to.have.length(3)
          expect(response.body.topics).to.be.an("array")
          response.body.topics.forEach(topic => {
            expect(topic).to.have.keys("slug", "description")
          })
        })
    })
    describe("/topics ERRORS", () => {
      it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
        const invalidMethods = ["patch", "post", "put", "delete"]
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Method Not Allowed"
              })
            })
        })
        return Promise.all(methodPromises)
      })
    })
  }) // END OF DESCRIBE TOPICS BLOCK
  describe("/users", () => {
    it("GET-200: GET request returns an array of all the users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(response => {
          expect(response.body.users).to.have.length(4)
          expect(response.body.users).to.be.an("array")
          response.body.users.forEach(user => {
            expect(user).to.have.keys("username", "avatar_url", "name")
          })
        })
    })
    describe("/:username", () => {
      it("GET-200: GET request returns an user object for the specified username", () => {
        return request(app)
          .get("/api/users/icellusedkars")
          .expect(200)
          .then(response => {
            expect(response.body.user).to.be.an("object")
            expect(response.body.user).to.deep.equal({
              username: "icellusedkars",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
              name: "sam"
            })
          })
      })
      describe("/:username ERRORS", () => {
        it("GET-404: GET request for valid syntax for username but the username does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/users/not-a-user")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: Valid Input Syntax But Does Not Exist"
              })
            })
        })
      })
    }) // END OF DESCRIBE /:username BLOCK
  }) // END OF DESCRIBE USERS BLOCK
  describe("/articles", () => {
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and default sorted by created_at in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
          expect(response.body.articles).to.be.descendingBy("created_at")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and sorted by sortBy query in descending order", () => {
      return request(app)
        .get("/api/articles?sortBy=title")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
          expect(response.body.articles).to.be.descendingBy("title")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and default sorted by created_at with sort query", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
          expect(response.body.articles).to.be.ascendingBy("created_at")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and sorted by as specified in query", () => {
      return request(app)
        .get("/api/articles?sortBy=author&order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
          expect(response.body.articles).to.be.ascendingBy("author")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and sorted by author query", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(3)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
            expect(article.author).to.equal("butter_bridge")
          })
          expect(response.body.articles).to.be.descendingBy("created_at")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and sorted by topic query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(1)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
            expect(article.topic).to.equal("cats")
          })
          expect(response.body.articles).to.be.descendingBy("created_at")
        })
    })
    it("GET-200: GET request returns an array of all the articles along with each article having a comment_count key-value and default sorted by created_at in descending order default when passed random queries", () => {
      return request(app)
        .get("/api/articles?abcdef=true&xyz=false")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(12)
          expect(response.body.articles).to.be.an("array")
          response.body.articles.forEach(article => {
            expect(article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            )
          })
          expect(response.body.articles).to.be.descendingBy("created_at")
        })
    })
    describe("/articles ERRORS", () => {
      it("GET-400: GET request for invalid sortBy query returns status 400 (Bad Request)", () => {
        return request(app)
          .get("/api/articles?sortBy=abcdef")
          .expect(400)
          .then(response => {
            expect(response.body).to.deep.equal({
              Message: "Bad Request: Column For sortBy Query Does Not Exist"
            })
          })
      })
      it("GET-400: GET request for invalid order query returns status 400 (Bad Request)", () => {
        return request(app)
          .get("/api/articles?order=abcdef")
          .expect(400)
          .then(response => {
            expect(response.body).to.deep.equal({
              Message: "Bad Request: Invalid order Query"
            })
          })
      })
      it("GET-404: GET request for non-existing author query returns status 404 (Not Found)", () => {
        return request(app)
          .get("/api/articles?author=abcdef")
          .expect(404)
          .then(response => {
            expect(response.body).to.deep.equal({
              Message: "Not Found: author Does Not Exist"
            })
          })
      })
      it("GET-404: GET request for non-existing topic query returns status 404 (Not Found)", () => {
        return request(app)
          .get("/api/articles?topic=abcdef")
          .expect(404)
          .then(response => {
            expect(response.body).to.deep.equal({
              Message: "Not Found: topic Does Not Exist"
            })
          })
      })
    })
    describe("/:article_id", () => {
      it("GET-200: GET request returns an article object for the specified article_id along with comment_count key in the object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object")
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13"
            })
          })
      })
      it("PATCH-200: PATCH request returns an article object for the specified article_id along with the votes property updated according to the patch request", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object")
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 200,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z"
            })
          })
      })
      it("PATCH-200: PATCH request returns an article object for the specified article_id with the votes property not updated when inc_votes is not on the body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ not_inc_votes: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.article).to.be.an("object")
            expect(response.body.article).to.deep.equal({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z"
            })
          })
      })
      describe("/:article_id ERRORS", () => {
        it("GET-404: GET request for valid syntax for username but the username does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: Valid Input Syntax But Does Not Exist"
              })
            })
        })
        it("GET-400: GET request for invalid syntax for username returns status 400 (Bad Request)", () => {
          return request(app)
            .get("/api/articles/abcdef")
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Bad Request: Invalid Input Syntax - Expected Integer"
              })
            })
        })
        it("PATCH-400: PATCH request for invalid syntax for inc_votes returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "not-a-number" })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Bad Request: Invalid Input Syntax - Expected Integer"
              })
            })
        })
        it("PATCH-400: PATCH request for multiple items on request body returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 100, not_inc_votes: 100 })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Bad Request: 'inc_votes: value' Must Be The Only Key-Value Pair On Request Body"
              })
            })
        })
        it("PATCH-404: PATCH request for valid syntax for article_id but the article_id does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: 100 })
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: Valid Input Syntax But Does Not Exist"
              })
            })
        })
        it("PATCH-400: PATCH request for invalid syntax for article_id returns 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/abcdef")
            .send({ inc_votes: 100 })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Bad Request: Invalid Input Syntax - Expected Integer"
              })
            })
        })
      })
      describe("/comments", () => {
        it("POST-201: POST request returns the newly added comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "newly added comment" })
            .expect(201)
            .then(response => {
              expect(response.body.comment).to.have.keys(
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              )
              expect(response.body.comment.author).to.equal("butter_bridge")
              expect(response.body.comment.body).to.equal("newly added comment")
              expect(response.body.comment.comment_id).to.equal(19)
              expect(response.body.comment.article_id).to.equal(1)
              expect(response.body.comment.votes).to.equal(0)
            })
        })
        it("GET-200: GET request returns an array of comments for the specified article_id", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.have.length(13)
              expect(response.body.comments).to.be.an("array")
              response.body.comments.forEach(comment => {
                expect(comment).to.have.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                )
                expect(comment.article_id).to.equal(1)
              })
            })
        })
        it("GET-200: GET request returns an array of comments for the specified article_id sorted by descending order of created_at", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.have.length(13)
              expect(response.body.comments).to.be.an("array")
              response.body.comments.forEach(comment => {
                expect(comment).to.have.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                )
                expect(comment.article_id).to.equal(1)
              })
              expect(response.body.comments).to.be.descendingBy("created_at")
            })
        })
        it("GET-200: GET request returns an array of comments for the specifed article_id sorted by as specified in the query in default descending order", () => {
          return request(app)
            .get("/api/articles/1/comments?sortBy=comment_id")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.have.length(13)
              expect(response.body.comments).to.be.an("array")
              response.body.comments.forEach(comment => {
                expect(comment).to.have.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                )
                expect(comment.article_id).to.equal(1)
              })
              expect(response.body.comments).to.be.descendingBy("comment_id")
            })
        })
        it("GET-200: GET request returns an array of comments for the specifed article_id sorted by as specified in the query in default descending order", () => {
          return request(app)
            .get("/api/articles/1/comments?sortBy=comment_id&order=asc")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.have.length(13)
              expect(response.body.comments).to.be.an("array")
              response.body.comments.forEach(comment => {
                expect(comment).to.have.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                )
                expect(comment.article_id).to.equal(1)
              })
              expect(response.body.comments).to.be.ascendingBy("comment_id")
            })
        })
        describe("/comments ERRORS", () => {
          it("POST-404: POST request for valid syntax for article_id but the article_id does not exist returns status 404 (Not Found)", () => {
            return request(app)
              .post("/api/articles/999/comments")
              .send({ username: "butter_bridge", body: "newly added comment" })
              .expect(404)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Not Found: Valid Input Syntax For article_id But Does Not Exist"
                })
              })
          })
          it("POST-400: POST request for invalid syntax for article_id returns 400 (Bad Request)", () => {
            return request(app)
              .post("/api/articles/abcdef/comments")
              .send({ username: "butter_bridge", body: "newly added comment" })
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: Invalid Input Syntax - Expected Integer"
                })
              })
          })
          it("POST-400: POST request for multiple items on request body returns status 400 (Bad Request)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "butter_bridge",
                body: "newly added comment",
                other: "this should not exist"
              })
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: 'username: value' And 'body: value' Must Be The Only Two Key-Value Pairs On Request Body"
                })
              })
          })
          it("POST-400: POST request for no body on the request body returns status 400 (Bad Request)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "butter_bridge"
              })
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: 'username: value' And 'body: value' Must Be The Only Two Key-Value Pairs On Request Body"
                })
              })
          })
          it("POST-400: POST request for no username on the request body returns status 400 (Bad Request)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                body: "newly added comment"
              })
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: 'username: value' And 'body: value' Must Be The Only Two Key-Value Pairs On Request Body"
                })
              })
          })
          it("POST-400: POST request for nothing on the request body return status 400 (Bad Request)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: 'username: value' And 'body: value' Must Be The Only Two Key-Value Pairs On Request Body"
                })
              })
          })
          it("GET-404: GET request for valid syntax for article_id but the article_id does not exist returns status 404 (Not Found)", () => {
            return request(app)
              .get("/api/articles/999/comments")
              .expect(404)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Not Found: Valid Input Syntax For article_id But Does Not Exist"
                })
              })
          })
          it("GET-404: GET request for invalid syntax for article_id returns status 400 (Bad Request)", () => {
            return request(app)
              .get("/api/articles/abcdef/comments")
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    "Bad Request: Invalid Input Syntax - Expected Integer"
                })
              })
          })
          it("GET-400: GET request for invalid sortBy query returns status 400 (Bad Request)", () => {
            return request(app)
              .get("/api/articles/1/comments?sortBy=abcdef")
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: "Bad Request: Column For sortBy Query Does Not Exist"
                })
              })
          })
          it("GET-400: GET request for invalid order query returns status 400 (Bad Request)", () => {
            return request(app)
              .get("/api/articles/1/comments?order=abcdef")
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: "Bad Request: Invalid order Query"
                })
              })
          })
        })
      }) // END OF DESCRIBE /comments
    }) // END OF DESCRIBE /:article_id
  }) // END OF DESCRIBE ARTICLES BLOCK
}) // END OF DESCRIBE API BLOCK
