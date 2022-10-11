const supertest = require("supertest");
const app = require("../src");
const request = supertest(app);
const marked = require("marked")
const utils = require("../src/utils");

const testMarkDownString = "# Test Mark Down Title\n\nfirst paragraph\n\nsecond paragraph"

describe("Expected responses of HTML requests", () => {
  beforeAll(() => {
    utils.getMarkDownContent = jest.fn().mockImplementation(async (dirPath) => {
      if (dirPath === "/existing/folder") {
        return Promise.resolve(testMarkDownString)
      } else {
        return Promise.reject("No matched folder found");
      }
    })
  })

  it("Valid URLs return a 200 HTTP status code", () => {
    return request
      .get('/existing/folder')
      .expect(200)
  });

  it("Valid URLs return a body that contains the HTML generated from the relevant markdown file", (done) => {
   request
      .get('/existing/folder')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).toContain(marked.parse(testMarkDownString))
        return done();
      })
  });

  it("URLs that do not match content folders return a 404 HTTP status code", () => {
    return request
      .get('/non/existing/folder')
      .expect(404)
  });
});