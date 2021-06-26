const fs = require('fs')
const express = require('express')
const app = express()

app.get('*', (req, res) => res.send(fs.readFileSync('debug.js', 'utf8')))
app.listen(80, () => console.log('Server running on localhost'))