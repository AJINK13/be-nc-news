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
  it("GET-200: GET request returns a JSON object describing all the available routes on the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(response => {
        expect(response.body.endpoints).to.be.an("object")
        expect(response.body.endpoints).to.deep.equal({
          "GET /api": {
            description:
              "serves up a json representation of all the available endpoints of the api"
          },
          "GET /api/topics": {
            description: "serves an array of all topics",
            queries: [],
            exampleResponse: {
              topics: [
                {
                  slug: "football",
                  description: "Footie!"
                }
              ]
            }
          },
          "GET /api/articles": {
            description: "serves an array of all topics",
            queries: ["author", "topic", "sort_by", "order"],
            exampleResponse: {
              articles: [
                {
                  article_id: 13,
                  title: "Seafood substitutions are increasing",
                  topic: "cooking",
                  author: "weegembump",
                  body: "Text from the article..",
                  created_at: 1527695953341,
                  comment_count: 45,
                  votes: 19
                }
              ]
            }
          },
          "GET /api/users": {
            description: "serves an array of all users",
            queries: [],
            exampleResponse: {
              users: [
                {
                  username: "this_is_a_username",
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                  name: "northcoders_shaq"
                }
              ]
            }
          },
          "GET /api/comments": {
            description: "serves an array of all comments",
            queries: [],
            exampleResponse: {
              comments: [
                {
                  comments_id: "11",
                  author: "northcoders_jenny",
                  article_id: "20",
                  votes: 250,
                  created_at: 1527695953349,
                  body: "This article is amazing"
                }
              ]
            }
          },
          "GET /api/users/:username": {
            description:
              "serves an object for an user for the specified username",
            queries: [],
            exampleResponse: {
              user: {
                username: "hello123",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                name: "northcoders_liam"
              }
            }
          },
          "GET /api/articles/:article_id": {
            description:
              "serves an object for an article for the specified article_id",
            queries: ["article_id"],
            exampleResponse: {
              article: {
                article_id: 17,
                title: "Living in the shadow",
                body: "I am scared",
                votes: 78,
                topic: "horror",
                author: "weriop",
                created_at: 1527695953343,
                comment_count: 8
              }
            }
          },
          "PATCH /api/articles/:article_id": {
            description:
              "serves an object for an article for the specified article_id with the votes property updated",
            queries: [],
            body: { inc_votes: 10 },
            exampleResponse: {
              article: {
                article_id: 17,
                title: "Living in the shadow",
                body: "I am scared",
                votes: 88,
                topic: "horror",
                author: "weriop",
                created_at: 1527695953342,
                comment_count: 8
              }
            }
          },
          "POST /api/articles/:article_id/comments": {
            description:
              "serves an object of the posted comment for the specified article_id",
            queries: [],
            body: {
              username: "northcoders_kim",
              body: "I feel really lucky today"
            },
            exampleResponse: {
              comment: {
                comment_id: 57,
                author: "northcoders_kim",
                article_id: 77,
                votes: 0,
                created_at: 1527695953349,
                body: "I feel really lucky today"
              }
            }
          },
          "GET /api/articles/:article_id/comments": {
            description:
              "serves an array of comments for the specified article_id",
            queries: ["sort_by", "order"],
            exampleResponse: {
              comment: [
                {
                  comment_id: 3,
                  author: "northcoders_mercy",
                  article_id: 16,
                  votes: 3,
                  created_at: 1527695953345,
                  body: "It's November"
                }
              ]
            }
          },
          "PATCH /api/comments/:comment_id": {
            description:
              "serves an object for a comment for the specified comment_id with the votes property updated",
            queries: [],
            body: { inc_votes: 3 },
            exampleResponse: {
              comment: {
                article_id: 2,
                comment_id: 31,
                body: "I am not happy about the cold weather",
                votes: 3,
                author: "santa",
                created_at: 1527695953333
              }
            }
          },
          "DELETE /api/comments/:comment_id": {
            description:
              "nothing served with comment deleted for the specified comment_id",
            queries: [],
            exampleResponse: {}
          }
        })
      })
  })
  describe("/api ERRORS", () => {
    it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
      const invalidMethods = ["patch", "post", "put", "delete"]
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api")
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
    describe("/users ERRORS", () => {
      it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
        const invalidMethods = ["patch", "post", "put", "delete"]
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/users")
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
        it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
          const invalidMethods = ["patch", "post", "put", "delete"]
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/users/icellusedkars")
              .expect(405)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: "Method Not Allowed"
                })
              })
          })
          return Promise.all(methodPromises)
        })
        it("GET-404: GET request for valid syntax for username but the username does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/users/abcdef")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Not Found: username Does Not Exist"
              })
            })
        })
      })
    }) // END OF DESCRIBE /:username BLOCK
  }) // END OF DESCRIBE USERS BLOCK
  describe("/articles", () => {
    it("GET-200: GET request returns an array of all the articles with each article having a comment_count key-value", () => {
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
    it("GET-200: GET request returns an array of all the articles and default sorted by created_at in descending order", () => {
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
    it("GET-200: GET request returns an array of all the articles and sorted by sort_by query in descending order", () => {
      return request(app)
        .get("/api/articles?sort_by=title")
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
    it("GET-200: GET request returns an array of all the articles and default sorted by created_at with order query", () => {
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
    it("GET-200: GET request returns an array of all the articles and sorted by as specified in query", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=asc")
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
    it("GET-200: GET request returns an array of all the articles and sorted by author query", () => {
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
    it("GET-200: GET request returns an empty array when the author exists but has no articles", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(0)
          expect(response.body.articles).to.be.an("array")
          expect(response.body.articles).to.deep.equal([])
        })
    })
    it("GET-200: GET request returns an array of all the articles and sorted by topic query", () => {
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
    it("GET-200: GET request returns an empty array when the topic exists but has no articles", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.have.length(0)
          expect(response.body.articles).to.be.an("array")
          expect(response.body.articles).to.deep.equal([])
        })
    })
    it("GET-200: GET request returns an array of all the articles and default sorted by created_at in descending order when passed random queries", () => {
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
      it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
        const invalidMethods = ["patch", "post", "put", "delete"]
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/articles")
            .expect(405)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: "Method Not Allowed"
              })
            })
        })
        return Promise.all(methodPromises)
      })
      it("GET-400: GET request for invalid sort_by query returns status 400 (Bad Request)", () => {
        return request(app)
          .get("/api/articles?sort_by=abcdef")
          .expect(400)
          .then(response => {
            expect(response.body).to.deep.equal({
              Message: 'Bad Request: column "abcdef" does not exist'
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
    it("GET-400: GET request for invalid limit query returns status 400 (Bad Request)", () => {
      return request(app)
        .get("/api/articles?limit=abcdef")
        .expect(400)
        .then(response => {
          expect(response.body).to.deep.equal({
            Message: "Bad Request: Invalid limit Query"
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
          .send({ abcdef: 100 })
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
      // it("PATCH-200: PATCH request returns an article object for the specified article_id with the votes property not updated when no inc_votes on the body", () => {
      //   return request(app)
      //     .patch("/api/articles/1")
      //     .send({})
      //     .expect(200)
      //     .then(response => {
      //       expect(response.body.article).to.be.an("object")
      //       expect(response.body.article).to.deep.equal({
      //         article_id: 1,
      //         title: "Living in the shadow of a great man",
      //         body: "I find this existence challenging",
      //         votes: 100,
      //         topic: "mitch",
      //         author: "butter_bridge",
      //         created_at: "2018-11-15T12:21:54.171Z"
      //       })
      //     })
      // })
      describe("/:article_id ERRORS", () => {
        it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
          const invalidMethods = ["post", "put", "delete"]
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/articles/1")
              .expect(405)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: "Method Not Allowed"
                })
              })
          })
          return Promise.all(methodPromises)
        })
        it("GET-404: GET request for valid syntax for article_id but the article_id does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Not Found: Valid Input Syntax for article_id But Does Not Exist"
              })
            })
        })
        it("GET-400: GET request for invalid syntax for article_id returns status 400 (Bad Request)", () => {
          return request(app)
            .get("/api/articles/abcdef")
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  'Bad Request: invalid input syntax for integer: "abcdef"'
              })
            })
        })
        it("PATCH-400: PATCH request for invalid syntax for inc_votes returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "abcdef" })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: 'Bad Request: invalid input syntax for integer: "NaN"'
              })
            })
        })
        it("PATCH-400: PATCH request for multiple items on request body returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 100, abcdef: 100 })
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
                Message:
                  "Not Found: Valid Input Syntax for article_id But Does Not Exist"
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
                Message:
                  'Bad Request: invalid input syntax for integer: "abcdef"'
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
            .get("/api/articles/1/comments?sort_by=comment_id")
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
        it("GET-200: GET request returns an array of comments for the specifed article_id sorted by as specified in the query", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
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
        it("GET-200: GET request returns an array of comments for the specified aricle_id which is default sorted by created_at in descending order when passed random queries", () => {
          return request(app)
            .get("/api/articles/1/comments?abcdef=true&xyz=false")
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
        it("GET-200: GET request returns an empty array when the article exists but has no comments", () => {
          return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.have.length(0)
              expect(response.body.comments).to.be.an("array")
              expect(response.body.comments).to.deep.equal([])
            })
        })
        describe("/comments ERRORS", () => {
          it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
            const invalidMethods = ["patch", "put", "delete"]
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/articles/1/comments")
                .expect(405)
                .then(response => {
                  expect(response.body).to.deep.equal({
                    Message: "Method Not Allowed"
                  })
                })
            })
            return Promise.all(methodPromises)
          })
          it("POST-404: POST request for valid syntax for article_id but the article_id does not exist returns status 404 (Not Found)", () => {
            return request(app)
              .post("/api/articles/999/comments")
              .send({ username: "butter_bridge", body: "newly added comment" })
              .expect(404)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message:
                    'Not Found: insert or update on table "comments" violates foreign key constraint "comments_article_id_foreign"'
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
                    'Bad Request: invalid input syntax for integer: "abcdef"'
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
                    'Bad Request: invalid input syntax for integer: "abcdef"'
                })
              })
          })
          it("GET-400: GET request for invalid sort_by query returns status 400 (Bad Request)", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=abcdef")
              .expect(400)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: 'Bad Request: column "abcdef" does not exist'
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
  describe("/comments", () => {
    it("GET-200: GET request returns an array of all the comments", () => {
      return request(app)
        .get("/api/comments")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.have.length(18)
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
          })
        })
    })
    describe("/comments ERRORS", () => {
      it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
        const invalidMethods = ["patch", "post", "put", "delete"]
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/comments")
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
    describe("/:comment_id", () => {
      it("PATCH-200: PATCH request returns a comment object for the specified comment_id along with the votes property updated according to the patch request", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.comment).to.be.an("object")
            expect(response.body.comment).to.deep.equal({
              comment_id: 1,
              author: "butter_bridge",
              article_id: 9,
              votes: 116,
              created_at: "2017-11-22T12:36:03.389Z",
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            })
          })
      })
      it("PATCH-200: PATCH request returns a comment object for the specified comment_id with the votes property not updated when inc_votes is not on the body", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ abcdef: 100 })
          .expect(200)
          .then(response => {
            expect(response.body.comment).to.be.an("object")
            expect(response.body.comment).to.deep.equal({
              comment_id: 1,
              author: "butter_bridge",
              article_id: 9,
              votes: 16,
              created_at: "2017-11-22T12:36:03.389Z",
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            })
          })
      })
      // it("PATCH-200: PATCH request returns a comment object for the specified comment_id with the votes property not updated when no inc_votes is on the body", () => {
      //   return request(app)
      //     .patch("/api/comments/1")
      //     .send()
      //     .expect(200)
      //     .then(response => {
      //       expect(response.body.comment).to.be.an("object")
      //       expect(response.body.comment).to.deep.equal({
      //         comment_id: 1,
      //         author: "butter_bridge",
      //         article_id: 9,
      //         votes: 16,
      //         created_at: "2017-11-22T12:36:03.389Z",
      //         body:
      //           "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
      //       })
      //     })
      // })
      it("DELETE-204: DELETE request returns status 204 (No Content)", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204)
      })
      describe("/:comment_id ERRORS", () => {
        it("INVALID METHODS-405: INVALID METHOD request returns 405 (Method Not Allowed)", () => {
          const invalidMethods = ["get", "post", "put"]
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/comments/1")
              .expect(405)
              .then(response => {
                expect(response.body).to.deep.equal({
                  Message: "Method Not Allowed"
                })
              })
          })
          return Promise.all(methodPromises)
        })
        it("PATCH-400: PATCH request for invalid syntax for inc_votes returns status 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "abcdef" })
            .then(response => {
              expect(response.body).to.deep.equal({
                Message: 'Bad Request: invalid input syntax for integer: "NaN"'
              })
            })
        })
        it("PATCH-400: PATCH request for multiple items on request body return status 400 (Bad Request", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 100, abcdef: 100 })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Bad Request: 'inc_votes: value' Must Be The Only Key-Value Pair On Request Body"
              })
            })
        })
        it("PATCH-404: PATCH request for valid syntax for comment_id but the comment_id does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .patch("/api/comments/999")
            .send({ inc_votes: 100 })
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Not Found: Valid Input Syntax for comment_id But Does Not Exist"
              })
            })
        })
        it("PATCH-400: PATCH request for invalid syntax for comment_id returns 400 (Bad Request)", () => {
          return request(app)
            .patch("/api/comments/abcdef")
            .send({ inc_votes: 100 })
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  'Bad Request: invalid input syntax for integer: "abcdef"'
              })
            })
        })
        it("DELETE-404: DELETE request for valid syntax for comment_id but the comment_id does not exist returns status 404 (Not Found)", () => {
          return request(app)
            .delete("/api/comments/999")
            .expect(404)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  "Not Found: Valid Input Syntax for comment_id But Does Not Exist"
              })
            })
        })
        it("DELETE-400: DELETE request for invalid syntax for comment_id returns 400 (Bad Request)", () => {
          return request(app)
            .delete("/api/comments/abcdef")
            .expect(400)
            .then(response => {
              expect(response.body).to.deep.equal({
                Message:
                  'Bad Request: invalid input syntax for integer: "abcdef"'
              })
            })
        })
      })
    }) // END OF /:comment_id BLOCK
  }) // END OF DESCRIBE COMMENTS BLOCK
  describe("ROUTING ERROR", () => {
    it("METHOD-404: Any METHOD for invalid route returns status 404 (Not Found)", () => {
      return request(app)
        .delete("/abcdef")
        .expect(404)
        .then(response => {
          expect(response.body).to.deep.equal({
            Message: "Not Found: Invalid Route"
          })
        })
    })
  })
}) // END OF DESCRIBE API BLOCK
