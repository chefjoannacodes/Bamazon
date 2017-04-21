var mysql = require("mysql");
var inquirer = require("inquirer");

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
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
            console.log("----------------------------------");
            console.log("ID: ", results[i].item_id);
            console.log("Item name: ", results[i].product_name);
            console.log("Department: ", results[i].department_name);
             console.log("Price: $",results[i].price);
             console.log("----------------------------------");
          }
          return choiceArray;
        },
        message: "What item would you like to buy?"
      },
      {
        name: "buy",
        type: "input",
        message: "How many would you like to buy?"
      
      }
    ]).then(function(answer) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.choice) {
          chosenItem = results[i];
          var itemQuantity = chosenItem.stock_quantity
          console.log("The selected item quantity", itemQuantity);
          console.log("answer.buy", answer.buy);
          var updatedQuantity = itemQuantity - answer.buy; 
          console.log("The updated quantity", updatedQuantity);

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
      }
      else {
        // item not in inventory
        console.log("This item is temporarily out of stock");
        selectItem();
      }
    });
  });
};

selectItem();



//check to see if sufficient quantity, if not, log phrase "Insufficient quantity!"



//update sql quantity after choose item


//show customer total cost of their purchase
