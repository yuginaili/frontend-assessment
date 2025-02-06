# JSON Manipulation Script

This project contains a Node.js script that performs various operations on a JSON file containing product data. The script reads the data from `products.json` and performs the following tasks:

1. Lists products that are out of stock, not on sale, and priced under $20.
2. Identifies the most commonly used category among the products.
3. Calculates the average price of items that are on sale.
4. Counts the number of women's products that are out of stock, broken down by color.

## Installation

1. Clone the repository to your local machine

2. Navigate to the project directory:

    ```sh
    cd json-manipulation
    ```

3. Ensure you have a `products.json` file in the project directory. This file should contain the product data in JSON format.

### Running the Script

Ensure you have a `products.json` file in the project directory. This file should contain the product data in JSON format.

To run the script, use the following command:

```sh
node app.js
