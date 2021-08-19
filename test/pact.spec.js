const expect = require("chai").expect
const path = require("path")
const { Pact } = require("@pact-foundation/pact")
const { getMeBooks, getMeBook, createMeBook } = require("../index")

describe("The Book API", () => {
  let url = "http://localhost"
  const port = 9001

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "BookConsumer",
    provider: "BookService",
    pactfileWriteMode: "merge",
  })

  const EXPECTED_GET_BOOKS_RESPONSE_BODY = [
    {
      "_id": "611e2a5156d0df7075bad0ea",
      "title": "Wuthering Heights",
      "author": "Jane Austen"
    },
    {
      "_id": "611e2abf56d0dfabadbad0ec",
      "title": "Dune",
      "author": "Frank Herbert"
    }
  ]

  const EXPECTED_GET_BOOK_RESPONSE_BODY = {
    
    "_id": "611e2a5156d0df7075bad0ea",
    "title": "Wuthering Heights",
    "author": "Jane Austen"
  }

  const EXPECTED_POST_RESPONSE_BODY = {
    "_id": "611e2abf56d0dfabadbad0ee",
    "title": "Heart of Darkness",
    "author": "Joseph Conrad"
  }

  const POST_REQUEST_BODY = {

    title: "Heart of Darkness", 
    author: "Joseph Conrad"
  }

  before(() => provider.setup())

  after(() => provider.finalize())

  afterEach(() => provider.verify())

  describe("get /books", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a request for all books",
        withRequest: {
          method: "GET",
          path: "/api/books",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_GET_BOOKS_RESPONSE_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMeBooks(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_GET_BOOKS_RESPONSE_BODY)
        done()
      }, done)
    })
  })

  describe("get /books/611e2a5156d0df7075bad0ea", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a request for a single book",
        withRequest: {
          method: "GET",
          path: "/api/books/611e2a5156d0df7075bad0ea",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_GET_BOOK_RESPONSE_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getMeBook(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_GET_BOOK_RESPONSE_BODY)
        done()
      }, done)
    })
  })

  describe("create /book", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a create new book request",
        withRequest: {
          method: "POST",
          path: "/api/books",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
          body: POST_REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: EXPECTED_POST_RESPONSE_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      createMeBook(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_POST_RESPONSE_BODY)
        done()
      }, done)
    })
  })
})