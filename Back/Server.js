const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '123123',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Создание таблиц, если они не существуют
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        purchase_article VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL,
        amount DECIMAL NOT NULL,
        purchase_date DATE,
        receipt_date DATE,
        repair_date DATE DEFAULT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS statuses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        change_date TIMESTAMP NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS purchase_articles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS operations (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        date TIMESTAMP NOT NULL,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        source VARCHAR(100) NOT NULL
      );
    `);
  } catch (err) {
    console.error('Error creating tables', err);
  }
};

createTables();

// Получение всех товаров
app.get('/api/products', async (req, res) => {
  const { status } = req.query;
  try {
    const result = status 
      ? await pool.query('SELECT * FROM products WHERE status = $1', [status])
      : await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Добавление нового товара
app.post('/api/products', async (req, res) => {
  const { name, status, purchase_article, quantity, amount, purchase_date, receipt_date } = req.body;

  if (!name || !status || !purchase_article || !quantity || !amount || !purchase_date || !receipt_date) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (isNaN(quantity) || isNaN(amount)) {
    res.status(400).json({ error: 'Quantity and amount must be numbers' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, status, purchase_article, quantity, amount, purchase_date, receipt_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, status, purchase_article, parseInt(quantity), parseFloat(amount), purchase_date, receipt_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Обновление статуса товара
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    let result;
    if (status === 'На ремонте') {
      result = await pool.query(
        'UPDATE products SET status = $1, repair_date = CURRENT_DATE WHERE id = $2 RETURNING *',
        [status, id]
      );
    } else {
      result = await pool.query(
        'UPDATE products SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
    }
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product status', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Удаление товара
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error deleting product', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
