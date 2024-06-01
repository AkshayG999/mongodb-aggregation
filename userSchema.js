const { default: mongoose, model, Mongoose } = require("mongoose");


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/aggregation", { useNewUrlParser: true })
    .then(() => {
        console.log("Mongodb connected")
    })
    .catch((err) => console.log(err))

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

let UserModel = mongoose.model("User", userSchema)


let user = async () => {
    let page = 1
    let limit = 1
    var data = await UserModel.find().skip(3).limit(10).sort({ _id: 1 })
    console.log(data)
    
    mongoose.connection.close(() => {
        console.log("MongoDb Disconnect")
    })
}
document.getElementById('mongodb').innerHTML=data

user()

