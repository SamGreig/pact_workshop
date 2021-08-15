const expect = require("chai").expect
const path = require("path")
const { Pact, Publisher } = require("@pact-foundation/pact")
const { getMeBooks, getMeBook, createMeBook } = require("../index")

// const opts = {
//   pactBroker = "http://localhost:9292/",
//   consumerVersion = "1.0.0",
//   pactFilesOrDirs = ""
// };

describe("The Book API", () => {
  let url = "http://localhost"
  const port = 9001

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "BookConsumerReplica",
    provider: "BookService",
    pactfileWriteMode: "merge",
  })

  const EXPECTED_GET_BOOKS_RESPONSE_BODY = [
    {
        "_id": "6113a2bffc523defca5428b0",
        "title": "Wuthering Heights",
        "author": "Jane Austen"
    },
    {
        "_id": "6113a2bffc523defca5428b1",
        "title": "Dune",
        "author": "Frank Herbert"
    }
  ]

  const EXPECTED_GET_BOOK_RESPONSE_BODY = [
    {
        "_id": "6113a2bffc523defca5428b0",
        "title": "Wuthering Heights",
        "author": "Jane Austen"
    }
  ]

  const EXPECTED_POST_RESPONSE_BODY = [
      {
        "_id": "6113a2bffc523defca5428b2",
        "title": "Heart of Darkness",
        "author": "Joseph Conrad"
      }
    ]

  const POST_REQUEST_BODY = [
    {
      title: "Heart of Darkness", 
      author: "Joseph Conrad"
    }
  ]

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
          path: "/books",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
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

  describe("get /books/6113a2bffc523defca5428b0", () => {
    before(done => {
      const interaction = {
        state: "i have a list of books",
        uponReceiving: "a request for a single book",
        withRequest: {
          method: "GET",
          path: "/books/6113a2bffc523defca5428b0",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
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
          path: "/books",
          headers: {
            Accept: "application/json",
          },
          body: POST_REQUEST_BODY
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
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