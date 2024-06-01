const { default: mongoose } = require("mongoose");


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://AkshayGaikwad:Akshay143@cluster0.ii90wme.mongodb.net/aggregation", { useNewUrlParser: true })
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log(err))

const ObjectId = mongoose.Schema.Types.ObjectId


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

let UserModel = mongoose.model("user", userSchema)

const cartSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: "user", required: true, unique: true },
    items: [
        {
            productId: { type: ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true },
            _id: false
        },
    ],
    totalPrice: { type: Number, required: true },
    totalItems: { type: Number, required: true },
},
    { timestamps: true }
)

let cartModel = mongoose.model("cart", cartSchema)


let cart = async () => {
    let cartdata = await cartModel.findById("6351887b27a477dba9da0318").populate("userId")
    console.log(cartdata)

    mongoose.connection.close(() => {
        console.log("MongoDb Disconnected")
    })
}

cart()
