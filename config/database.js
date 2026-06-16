const mongoose = require("mongoose")

require("dotenv").config()

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log("error in db")
    console.log(err.message)
    process.exit(1)
  })
}

module.exports = dbConnect