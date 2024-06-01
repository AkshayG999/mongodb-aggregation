
//________________________________________________________________________________________________________________________

const { default: mongoose, model } = require("mongoose");


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/aggregation", { useNewUrlParser: true })
    .then(() => {
        console.log("Mongodb connected")
    })
    .catch((err) => console.log(err))


//_________________________________________________________________________________________________________________________


// const userSchema = new mongoose.Schema({

//     name: { type: String },
//     age: { type: Number },
//     address: { type: String }

// })

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    profileImage: {
        type: String,
        // required: true
    }, // s3 link
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }, // encrypted password
    address: {
        shipping: {
            street: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            pincode: {
                type: Number,
                trim: true
            }
        },
        billing: {
            street: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            pincode: {
                type: Number,
                trim: true
            }
        }
    }
},
    { timestamps: true })

// let UserModel = mongoose.model("User", userSchema)

let userModel = model("user", userSchema)

// let user = async () => {

// let createUser = await userModel.create({

//     fname: "John",
//     lname: "Doe",
//     email: "johndoe@mailinator.com",
//     profileImage: "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/user/copernico-p_kICQCOM4s-unsplash.jpg",
//     phone: 9876543210,
//     password: "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
//     address: {
//         shipping: {
//             street: "MG Road",
//             city: "Indore",
//             pincode: 452001
//         },
//         billing: {
//             street: "MG Road",
//             city: "Indore",
//             pincode: 452001
//         }
//     },
// })
// console.log(createUser)


//     let data = await userModel.find({ createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } }).select({_id:0,fname:1})
//     console.log(data)
//     // await userModel.deleteMany()

//     mongoose.connection.close()    // mongoose.disconnect()
//         .then(() => console.log("MongoDB disconnect"))
//         .catch((err) => console.log(err))
// }

// user()


// userModel.aggregate(
//     [
//         {
//             '$group': {
//                 '_id': '$fname',
//                 'pinCodeAddition': {
//                     '$sum': '$address.billing.pincode'
//                 }
//             }
//         }
//     ]
// )
//     .then((result) => {
//         console.log(result)
//         mongoose.connection.close((() => console.log("Disconnect")))
//         // return result;
//     })
//     .catch((err) => {
//         mongoose.connection.close()
//         console.log(err)
//     })

//________________________________________________________________________________________________________________________________________


