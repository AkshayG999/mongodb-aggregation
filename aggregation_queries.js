// Here is an example of using the $group operator in MongoDB to group documents based on a specific field:

// Suppose you have a collection named "sales" with documents like this:
/*
{
    _id: 1,
        "item": "apple",
            "price": 10,
                "quantity": 2
}
{
    "_id": 2,
        "item": "banana",
            "price": 20,
                "quantity": 1
}
{
    "_id": 3,
        "item": "apple",
            "price": 10,
                "quantity": 3
}
*/
// You can use the $group operator to group the documents by "item" and calculate the sum of "price" and "quantity" for each group:

db.sales.aggregate([
    {
        $group: {
            _id: "$item",
            total_price: { $sum: "$price" },
            total_quantity: { $sum: "$quantity" }
        }
    }
])
// This will produce the following result:

/*{
    "_id": "apple",
        "total_price": 20,
            "total_quantity": 5
}
{
    "_id": "banana",
        "total_price": 20,
            "total_quantity": 1
}*/

// As you can see, the documents are grouped by the "item" field and the sum of "price" and "quantity" is calculated for each group.

//__________________________________________________________________________________________________________________________________

// nested object exaple
// Here is an example of using the $group operator to group documents based on a nested field in MongoDB:

// Suppose you have a collection named "sales" with documents like this:

/*
{
    "_id": 1,
        "item": {
        "name": "apple",
            "category": "fruit"
    },
    "price": 10,
        "quantity": 2
}
{
    "_id": 2,
        "item": {
        "name": "banana",
            "category": "fruit"
    },
    "price": 20,
        "quantity": 1
}
{
    "_id": 3,
        "item": {
        "name": "carrot",
            "category": "vegetable"
    },
    "price": 5,
        "quantity": 3
}
*/
// You can use the $group operator to group the documents by the "item.category" field and calculate the sum of "price" and "quantity" for each group:


db.sales.aggregate([
    {
        $group: {
            _id: "$item.category",
            total_price: { $sum: "$price" },
            total_quantity: { $sum: "$quantity" }
        }
    }
])

// This will produce the following result:
/*
{
    "_id": "fruit",
        "total_price": 30,
            "total_quantity": 3
}
{
    "_id": "vegetable",
        "total_price": 5,
            "total_quantity": 3
}
*/

// As you can see, the documents are grouped by the "item.category" field and the sum of "price" and "quantity" is calculated for each group.

//__________________________________________________________________________________________________________________________________

// array of objects
// Here is an example of using the $group operator to group documents based on an array of objects in MongoDB:

// Suppose you have a collection named "sales" with documents like this:

/*
{
    "_id": 1,
        "items": [
            {
                "name": "apple",
                "price": 10,
                "quantity": 2
            },
            {
                "name": "banana",
                "price": 20,
                "quantity": 1
            }~
        ]
}
{
    "_id": 2,
        "items": [
            {
                "name": "apple",
                "price": 10,
                "quantity": 3
            },
            {
                "name": "carrot",
                "price": 5,
                "quantity": 2
            }
        ]
}
*/

// You can use the $unwind operator to "flatten" the array and then use the $group operator to group the documents by the "items.name" field and calculate the sum of "items.price" and "items.quantity" for each group:


db.sales.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.name",
            total_price: { $sum: "$items.price" },
            total_quantity: { $sum: "$items.quantity" }
        }
    }
])
// This will produce the following result:

/*
{
    "_id": "apple",
        "total_price": 20,
            "total_quantity": 5
}
{
    "_id": "banana",
        "total_price": 20,
            "total_quantity": 1
}
{
    "_id": "carrot",
        "total_price": 5,
            "total_quantity": 2
}
*/

// As you can see, the documents are grouped by the "items.name" field and the sum of "items.price"
//  and "items.quantity" is calculated for each group.

//__________________________________________________________________________________________________________________________________


// ------------$unwind in aggregation----------------

/*
In MongoDB, $unwind is an aggregation operator used to deconstruct an array field from the input documents
and return separate documents for each element in the array.The output of $unwind is a stream of documents
where each document corresponds to a single element of the unwound array.The result documents contain all 
fields from the original document, but with the addition of a new field that holds the value of the element 
from the unwound array.

For example, consider a collection of documents representing sales transactions, where each document 
has an array of items purchased in a single transaction:
*/

/* 
{ "_id" : 1, "item" : "abc", "qty" : 10, "price" : 5 }
{ "_id" : 2, "item" : "xyz", "qty" : 5, "price" : 8 }
{ "_id" : 3, "item" : ["abc", "xyz"], "qty" : [10, 5], "price" : [5, 8] }
*/

//__________________________________________________________________________________________________________________________________


// The following aggregation pipeline uses $unwind to return separate documents for each item in the item array of the third document:

db.sales.aggregate([
    {
        $unwind: "$item"
    }
])
// <<<<<<<=The result would be:=>>>>>>>>
/*
{ "_id" : 3, "item" : "abc", "qty" : 10, "price" : 5 }
{ "_id" : 3, "item" : "xyz", "qty" : 5, "price" : 8 }
*/

// To count the number of elements in an array field in MongoDB aggregation, you can use the $size operator.
//  The $size operator returns the length of an array.

// For example, if you have a collection named "sales" with documents representing sales transactions, and each
// document has an "items" field that is an array of items sold in the transaction, you could use the following
//  aggregation pipeline to count the total number of items sold:

db.sales.aggregate([
    {
        $group: {
            _id: null,
            totalItems: { $sum: { $size: "$items" } }
        }
    }
])


// To count the number of objects in an array of objects in MongoDB aggregation, you can use the $sum operator
//  in combination with the $map operator.

db.sales.aggregate([
    {
        $group: {
            _id: null,
            totalItems: {
                $sum: {
                    $map: {
                        input: "$items",
                        in: 1
                    }
                }
            }
        }
    }
])


//___________________________________________________________________________________________________________________

// --------------how to get two collections data in aggregation pipeline---------------

// In MongoDB, you can use the $lookup stage in an aggregation pipeline to join data from two collections.
// The $lookup stage performs a left outer join on two collections by including documents from the "right" 
// collection based on the specified condition.

db.collection1.aggregate([
    {
        $lookup:
        {
            from: "collection2",
            localField: "field1",
            foreignField: "field2",
            as: "joined_data"
        }
    }
])

//___________________________________________________________________________________________________________________

/* 
 ----------- College Interns filter ===>> College Name and its Total Interns count show------------------ 
[
    {
      '$lookup': {
        'from': 'interns', 
        'localField': '_id', 
        'foreignField': 'collegeId', 
        'as': 'collegeData'
      }
    }, {
      '$project': {
        'Name': '$fullName', 
        'TotalInterns': {
          '$size': '$collegeData'
        }
      }
    }
  ]
  */

    
