const axios = require("axios")

exports.getMeBooks = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/api/books",
    headers: { Accept: "application/json; charset=utf-8" },
  })
}

exports.getMeBook = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/api/books/611e2a5156d0df7075bad0ea",
    headers: { Accept: "application/json; charset=utf-8" },
  })
}

exports.createMeBook = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "POST",
    baseURL: `${url}:${port}`,
    url: "/api/books",
    headers: { Accept: "application/json; charset=utf-8" },
    data: { title: "Heart of Darkness", author: "Joseph Conrad" }
  })
}