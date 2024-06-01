
// To perform pagination in MongoDB using Mongoose, you can use the .skip() and .limit() methods in your
//  query to determine the number of documents to skip and the number of documents to limit the result to.

const { default: mongoose } = require("mongoose")

const page = 2; // specify the current page
const limit = 10; // specify the number of results per page

MyModel.find({}).skip((page - 1) * limit).limit(limit)
    .exec((err, docs) => {
        // handle error and return the paginated documents
    });
//___________________________________________________________________________________________________________________

// To find the most recent 10 documents in MongoDB, you can sort the results in descending order by the 
// creation timestamp and limit the result to 10 documents using the .sort() and .limit() methods in your query.

MyModel.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, docs) => {
        // handle error and return the most recent 10 documents
    });

//___________________________________________________________________________________________________________________

// To find the documents created in the last hour in MongoDB, you can use the current timestamp
// and the $gte operator to filter the documents that have a createdAt field value greater than or 
// equal to the current timestamp minus one hour.

const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

MyModel.find({
    createdAt: { $gte: oneHourAgo }
})
    .exec((err, docs) => {
        // handle error and return the documents created in the last hour
    });

//___________________________________________________________________________________________________________________

UserModel.find({ age: { $lte: 24, $gte: 18 } })
let data = await userModel.find({ "address.billing.pincode": { $gt: 110110 } })

db.collection.find({ $and: [{ age: { $gte: 10, $lte: 20 } }, { otherField: "someValue" }] })



//___________________________________________________________________________________________________________________


// To update an object of a nested field in MongoDB, you can use the MongoDB update operator "$set". Here's an example:
db.collection.updateOne(
    { "outerField.innerField": "valueToMatch" },
    { $set: { "outerField.$.updatedField": "newValue" } }
)

//___________________________________________________________________________________________________________________

// mongoose.disconnect() method is used to close the default connection, while mongoose.connection.close()
//  method is used to close a specific connection.

//multiple connections established in your Mongoose application, you can use mongoose.connection.close()
//method to close a specific connection, whereas mongoose.disconnect() method will close the default connection.

mongoose.connection.close()    // mongoose.disconnect()
    .then(() => console.log("MongoDB disconnect"))
    .catch((err) => console.log(err))

mongoose.disconnect()
    .then(() => console.log("MongoDB disconnect"))
    .catch((err) => console.log(err))

//___________________________________________________________________________________________________________________

// Update the Field Data Type   so write this query
db.collection.updateMany(
    {},
    [
        {
            $set: {
                like: {
                    $convert: {
                        input: "$like",
                        to: "double",    //to: "int",  to:""
                        onError: 0.0,
                        onNull: 0.0
                    }
                }
            }
        }
    ]
)

//____________________________________________________________________________________________________________________________________________

// "Mon, 30 Jan 2023 13:16:37 GMT", for this  format
db.collection.updateMany(
    {},
    [
        {
            $set: {
                at: {
                    $dateFromString: {
                        dateString: "$at",
                        format: "%a, %d %b %Y %H:%M:%S GMT"
                    }
                }
            }
        }
    ]
)
//____________________________________________________________________________________________________________________________________________
