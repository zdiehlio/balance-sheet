const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res, next) => res.send('home working'))

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
