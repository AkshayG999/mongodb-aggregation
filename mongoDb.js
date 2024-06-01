// const express = require('express')
// const { default: mongoose } = require('mongoose')
// const app = express()


// mongoose.set('strictQuery', false)
// mongoose.connect("mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/aggregation", { useNewUrlParser: true })
//     .then(() => console.log("Mongodb connected"))
//     .catch((err) => console.log(err))


// app.listen(3000, () => {
//     console.log("server Running ")
// })


// db.getCollection('student').aggregate([
//     {
//         $lookup: {
//             from: "school",
//             localField: "sc_id",
//             foreignField: "id",
//             as: "qwerty",
//         }
//     }
// ])

// mongoose.connection.close(() => console.log('connection close'))