// I used the activity to figure this out. 
var mysql = require("mysql");
var inquirer = require("inquirer");

// trying to make it easier for the customer to view
// var Table = require('cli-table');
// var table = new Table({
//    head: ['TH 1 Item ID', 'TH 2 Product Name', 'TH 3 Price', 'TH 4 Stock' ]
//    , colWidths: [200, 200]
// });

var connection = mysql.createConnection({
   host: "localhost",
   // Your port; if not 3306
   port: 3307, //it was taken !
   // Your username
   user: "root",
   // Your password
   password: "root",
   database: "bamazon"
});

connection.connect(function (err) {
   if (err) throw err;
   // run the start function after the connection is made to prompt the user
   displayProducts();
});

function line() {
   console.log("----------------------------");
}

function displayProducts() {
   connection.query(`SELECT item_id, product_name, stock_quantity, price FROM products`, function (err, res) {
      if (err) throw err;
      // console.log(res);
      res.forEach(function (pickles) {
         console.log(
            `    ID:      ${pickles.item_id}
    Product: ${pickles.product_name}
    Price:   $${pickles.price}.00
    Quantity: ${pickles.stock_quantity}`);
         line();
      })
      startBamazon();
   });
};

//i deleted item 1 .. yep... sure did!

function startBamazon() {
   // console.log("working");
   inquirer
      .prompt([
         {
            type: "input",
            name: "itemID",
            message: "What would you like to purchase today? (Type in the Item ID)"
         },
         {
            type: "input",
            name: "qty",
            message: "How many would you like today?"
         }
      ]
      )
      .then(function (customerResponse, res) {
         console.log("Product ID Entered: " + customerResponse.itemID);
 
         connection.query(
            `SELECT * 
            FROM products
            WHERE item_id=${customerResponse.itemID}`, function (err, res) {
               if (err) throw err;// err is built in. 
               if (res[0].stock_quantity >= customerResponse.qty) {
                  checkout(res[0], customerResponse);
                  console.log("Product you selected is: " + res[0].product_name);
               }
               else {
                  console.log(`Not enough inventory ${res[0].product_name}. Please select another item and/or lower your quantity`)
                  startBamazon();
               }
            })
      })

}

function checkout(res, customerResponse) {
   // console.log("checkout working");
   connection.query(`UPDATE products SET ? WHERE ? `,
      //? is a marker in SQL that will look for a value. 
      //SQL syntax requires you to do it this way. instead of using 
      //template literal is tough
      [
         {
            stock_quantity: res.stock_quantity - customerResponse.qty
         },
         {
            item_id: res.item_id
         }
      ], function (error, results, fields) {
         if (error) throw error;

         connection.query(`SELECT price 
         FROM products
         WHERE item_id=${customerResponse.itemID}`, function (error, result) {
               console.log("Total Price for Today's Purchase is: $" + (result[0].price) * customerResponse.qty);
               closeConnection(); //build this out later
            })
      })
}

function closeConnection() {
   connection.end();
}



// function which prompts the user for what action they should take
// function startBamazon() {
//    inquirer
//       .prompt({
//          name: "Item",
//          type: "list",
//          message: "Would you like ?",
//          choices: ["POST", "BID", "EXIT"]
//       })
//       .then(function (answer) {
//          // based on their answer, either call the bid or the post functions
//          if (answer.postOrBid === "POST") {
//             postAuction();
//          }
//          else if (answer.postOrBid === "BID") {
//             bidAuction();
//          } else {
//             connection.end();
//          }
//       });
// }

// // function to handle posting new items up for auction
// function postAuction() {
//    // prompt for info about the item being put up for auction
//    inquirer
//       .prompt([
//          {
//             name: "item",
//             type: "input",
//             message: "What is the item you would like to submit?"
//          },
//          {
//             name: "category",
//             type: "input",
//             message: "What category would you like to place your auction in?"
//          },
//          {
//             name: "startingBid",
//             type: "input",
//             message: "What would you like your starting bid to be?",
//             validate: function (value) {
//                if (isNaN(value) === false) {
//                   return true;
//                }
//                return false;
//             }
//          }
//       ])
//       .then(function (answer) {
//          // when finished prompting, insert a new item into the db with that info
//          connection.query(
//             "INSERT INTO auctions SET ?",
//             {
//                item_name: answer.item,
//                category: answer.category,
//                starting_bid: answer.startingBid || 0,
//                highest_bid: answer.startingBid || 0
//             },
//             function (err) {
//                if (err) throw err;
//                console.log("Your auction was created successfully!");
//                // re-prompt the user for if they want to bid or post
//                startBamazon();
//             }
//          );
//       });
// }

// function bidAuction() {
//    // query the database for all items being auctioned
//    connection.query("SELECT * FROM auctions", function (err, results) {
//       if (err) throw err;
//       // once you have the items, prompt the user for which they'd like to bid on
//       inquirer
//          .prompt([
//             {
//                name: "choice",
//                type: "rawlist",
//                choices: function () {
//                   var choiceArray = [];
//                   for (var i = 0; i < results.length; i++) {
//                      choiceArray.push(results[i].item_name);
//                   }
//                   return choiceArray;
//                },
//                message: "What auction would you like to place a bid in?"
//             },
//             {
//                name: "bid",
//                type: "input",
//                message: "How much would you like to bid?"
//             }
//          ])
//          .then(function (answer) {
//             // get the information of the chosen item
//             var chosenItem;
//             for (var i = 0; i < results.length; i++) {
//                if (results[i].item_name === answer.choice) {
//                   chosenItem = results[i];
//                }
//             }

//             // determine if bid was high enough
//             if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                // bid was high enough, so update db, let the user know, and start over
//                connection.query(
//                   "UPDATE auctions SET ? WHERE ?",
//                   [
//                      {
//                         highest_bid: answer.bid
//                      },
//                      {
//                         id: chosenItem.id
//                      }
//                   ],
//                   function (error) {
//                      if (error) throw err;
//                      console.log("Bid placed successfully!");
//                      start();
//                   }
//                );
//             }
//             else {
//                // bid wasn't high enough, so apologize and start over
//                console.log("Your bid was too low. Try again...");
//                start();
//             }
//          });
//    });
// }

