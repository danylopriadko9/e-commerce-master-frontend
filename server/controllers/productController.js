import { db } from '../app.js';

import { readdir } from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();

export const getProductsWithDiscountQuery = (req, res) => {
  const productsWithDiscountQuery = `
    SELECT 
      pl.name as product_name, 
      cl.name as category_name, 
      pl.url, 
      pp.base_price, 
      pp.discount_percent, 
      pi.dir_path, 
      pi.filename, 
      pc.product_id 
  FROM product_category pc
  JOIN product_lang pl ON pc.product_id = pl.product_id
  JOIN category_lang cl ON pc.category_id = cl.category_id
  JOIN product_price pp ON pc.product_id = pp.product_id
  JOIN product_image pi ON pi.product_id = pc.product_id
  WHERE pl.language_id = 1 
  AND cl.language_id = 1
  AND pp.discount_percent > 25
    `;

  db.query(productsWithDiscountQuery, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
};

export const getProductImage = async (req, res) => {
  const dir = `/static/product/${req.params.id}`;
  const dirents = await readdir(__dirname + dir, (err) => {
    if (err) throw new Error(err);
  });
  res.redirect(`http://localhost:3001${dir}/${dirents[0]}`);
};

export const getNewProducts = (req, res) => {
  const q = `
        SELECT distinct
	        pl.name as product_name, 
            cl.name as category_name, 
            pl.url, 
            pp.base_price, 
            pp.discount_percent, 
            pc.product_id
        FROM product_category pc
        JOIN product_lang pl ON pc.product_id = pl.product_id
        JOIN category_lang cl ON pc.category_id = cl.category_id
        JOIN product_price pp ON pc.product_id = pp.product_id
        JOIN product_image pi ON pi.product_id = pc.product_id
        JOIN product p ON pc.product_id = p.id
        WHERE pl.language_id = 1 
        AND cl.language_id = 1
        ORDER BY p.t_created DESC
        LIMIT 20
    `;

  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
};

export const getOneProductByUrl = (req, res) => {
  const url = req.params.url;
  console.log(url);
  const q = `
    SELECT distinct
      pl.name as product_name, 
      cl.name as category_name, 
      pl.url, 
      pp.base_price, 
      pp.discount_percent, 
      pc.product_id,
      pl.description,
      pl.meta_description,
      pl.meta_title
    FROM product_category pc
    JOIN product_lang pl ON pc.product_id = pl.product_id
    JOIN category_lang cl ON pc.category_id = cl.category_id
    JOIN product_price pp ON pc.product_id = pp.product_id
    JOIN product p ON pc.product_id = p.id
    WHERE pl.url = '${url}'
    AND cl.language_id = 1
  `;

  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
};
