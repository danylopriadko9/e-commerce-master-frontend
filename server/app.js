import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mysql from 'mysql2';
import {
  categoriesController,
  productController,
  newsController,
} from './controllers/index.js';
import path from 'path';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

const __dirname = path.resolve();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/categories', categoriesController.getAllCategories);
app.get('/discount', productController.getProductsWithDiscountQuery);
app.get('/news', newsController.getAllNews);
app.get('/getProductImage/:id', productController.getProductImage);
app.get('/newProducts', productController.getNewProducts);
app.get('/product/:url', productController.getOneProductByUrl);
app.get('/product/photos/:id', productController.getAffPhotoForOneProduct);

app.use('/static', express.static(path.join(__dirname + '/static')));

app.listen(port, () => {
  console.log(`Server is running on ${port} PORT!`);
});
