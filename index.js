const axios = require("axios")

exports.getMeBooks = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/books",
    headers: { Accept: "application/json" },
  })
}

exports.getMeBook = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/books/6113a2bffc523defca5428b0",
    headers: { Accept: "application/json" },
  })
}

exports.createMeBook = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "POST",
    baseURL: `${url}:${port}`,
    url: "/books",
    headers: { Accept: "application/json" },
    data: [{ title: "Heart of Darkness", author: "Joseph Conrad" }]
  })
}