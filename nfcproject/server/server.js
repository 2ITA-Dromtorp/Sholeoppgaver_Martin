const express = require('express')
const app = express()
const port = process.env.PORT || 8080
app.use(express.static("build"));

app.get('/nfc', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
