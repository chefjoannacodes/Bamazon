# Bamazon

## This is a mock "Amazon" application in which the user can choose to purchase a variety of items for sale. Using node, inquirer, mySql and the terminal bash window, the user can view the items for sale upon running the application in GitBash. The javascript file is linked to the mySql databse so the items are organized in a table format and are accessed with their unique ID. 

This app runs through the Gitbash terminal and mySql database. It is possible to see the functionality through watching it at this link..

## Requirements
#### 
1. Create a MySQL Database called Bamazon.
2. Then create a Table inside of that database called products.
3. The products table should have each of the following columns:
- item_id (unique id for each product)
- product_name (Name of product)
- department_name
- price (cost to customer)
- stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
5. Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
6. The app should then prompt users with two messages.
- The first should ask them the ID of the product they would like to buy.
- The second message should ask how many units of the product they would like to buy.
7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
8. However, if your store does have enough of the product, you should fulfill the customer's order.
-This means updating the SQL database to reflect the remaining quantity.
-Once the update goes through, show the customer the total cost of their purchase.


## Technologies Used
#### 
- GitBash
- MySql(Pro)
- Javascript
- Inquirer.js
- Node.js

## Code Explaination
- First, I created a database and table in MySql Pro. I added some mock data to the table. This was the schema I created:

```
USE Bamazon_db;

CREATE TABLE products (
	item_id INT (11) AUTO_INCREMENT primary key NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL, 
	price DECIMAL (10,4),
	stock_quantity INT(5) 
);

```
- I then created a Javascript file and installed the mysql and inquirer package

- I made the connection between my javascript file and mySql by making a connection with the code below. 
```
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

```

- Upon loading the javascript file in the terminal bash window, i.e. "node bamazonCustomer.js", the list of items for sale would display. Using Inquirer, I asked the user which item they would like to buy. To display the items, the code was 

```
connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

```

- Once the user selected the item, I checked if there was sufficient quantity in the mysql database. If quantity was sufficient, I would update the quantity, otherwise the user would read "This item is temporarily out of stock". I then made another connection query to update the quantity of the item after the user input how many they would like to buy. 

- Finally, the total is displayed for the user with the product name and total price in the terminal bash window.
-------------
