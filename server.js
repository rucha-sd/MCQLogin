const express = require('express')
require('./db.js')
const userRouter = require('./router.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.get('/', (req,res)=>{
    res.send('This is port 3000')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
