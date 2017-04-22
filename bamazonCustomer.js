var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
});


//first display all the items for sale

// function to get all items available for buying, and allow you to choose item
var selectItem = function() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to buy
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
                  console.log("                                                                                  ");
                console.log("----------------------------------------------------------------------------------");
                console.log("-------------------------WELCOME TO BAMAZON---------------------------------------");
                console.log("----------------------------------------------------------------------------------");
                console.log("                                                                                  ");
                console.table(results);
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);

                }
                return choiceArray;
            },
            message: "What item would you like to buy?"
        }, {
            name: "buy",
            type: "input",
            message: "How many would you like to buy?"

        }]).then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                    var itemQuantity = chosenItem.stock_quantity
                    var updatedQuantity = itemQuantity - answer.buy;

                }
            }

            // determine if item is in stock
            if (itemQuantity >= answer.buy) {
                console.log("This item is in stock");
                // item is in stock, so update db, let the user know, and start over
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: updatedQuantity
                }, {
                    item_id: chosenItem.item_id
                }], function(err, results) {
                    // if (error) throw err;
                    console.log("Item placed in shopping cart");
                    console.log("Your total for " + answer.buy + " " + chosenItem.product_name + " is: $" + answer.buy * chosenItem.price);
                });
            } else {
                // item not in inventory
                console.log("This item is temporarily out of stock");
                selectItem();
            }
        });
    });
};

selectItem();
