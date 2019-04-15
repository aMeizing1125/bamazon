DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
/*well you drop it, and create it, and then use it*/
USE bamazon;

CREATE TABLE products
(
   item_id INT NOT NULL
   AUTO_INCREMENT,
   product_name VARCHAR
   (100) NOT NULL,
   department_name VARCHAR
   (100) NOT NULL,
   price DECIMAL
   (10,2) NOT NULL,
   stock_quantity INT NOT NULL,
   PRIMARY KEY
   (item_id)
);

SELECT * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Laptop", "technology", 1000, 50),
("Yoga Pants", "Clothing", 15, 100),
("Yoga Mat", "Exercise", 40, 100),
("Vape", "Entertainment", 50, 100), 
("Wine", "Pantry", 20, 100), 
("Beer", "Pantry", 18, 100),
("Coffee", "Pantry", 8, 100), 
("Dog Food", "Pets", 58, 100), 
("Paint", "Household", 3, 100), 
("Heels", "Shoe", 100, 10); 

-- DELETE FROM products WHERE item_id=1; dropped database and added it back to fix this.  :) 