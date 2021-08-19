const { Verifier } = require('@pact-foundation/pact');
let opts = {
    providerBaseUrl: "http://localhost:3001/",
    pactBrokerUrl: "http://localhost:9292/",
    provider: "BookService",
    // consumerVersionTags: ["master", "test", "prod"],
    publishVerificationResult: true, //generally you'd do something like `process.env.CI === 'true'`
    providerVersion: "version", //recommended to be the git sha
    providerVersionTags: ["main"], //optional, recommended to be the git branch
};

new Verifier(opts).verifyProvider()