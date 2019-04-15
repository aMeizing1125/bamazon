DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Laptop", "technology", 1000, 100),
("Yoga Pants", "Clothing", 15, 100),
("Yoga Mat", "Exercise", 40, 100),
("Vape", "Entertainment", 50, 100), 
("Wine", "Pantry", 20, 100), 
("Beer", "Pantry", 18, 100),
("Coffee", "Pantry", 8, 100), 
("Dog Food", "Pets", 58, 100), 
("Paint", "Household", 3, 100), 
("Pumps", "Shoe", 100, 100); 



