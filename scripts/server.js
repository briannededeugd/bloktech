const express = require("express")
const app = express()
const port = 3000

// req staat voor 'request', dus wat de HTTP request is, en res staat voor 'response' wat een express app terugstuurt 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
