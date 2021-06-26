const fs = require('fs')
const fetch = require('node-fetch')
const express = require('express')
const app = express()

app.get('/code', function (req, res) {
    const text = fs.readFileSync('debug.js', 'utf8')
    return res.send(text)
})

app.get('/git', function (req, res) {
    return fetch('https://github.com/mneser/debugger')
        .then(function (rep) {
            return rep.text()
        })
        .then(function (tx) {
            return res.send(tx)
        })
        .catch(function (err) {
            console.log(err)
        })
})

app.listen(8080, function () {
    console.log('Server running on localhost')
})