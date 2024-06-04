const express = require('express')
const app = express()
const port = 3000
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const routes = require('./routes');
const cors = require("cors")

app.use(cors())
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MongoDB")).catch((err) => console.log(err))

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})