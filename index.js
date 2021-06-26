const fs = require('fs')
const fetch = require('node-fetch')
const express = require('express')
const app = express()

app.get('/code', (req, res) => res.send(fs.readFileSync('debug.js', 'utf8')))
app.get('/git', (req, res) => fetch('https://github.com/mneser/debugger').then(rs => rs.text()).then(tx => res.send(tx)))

app.listen(80, () => console.log('Server running on localhost'))