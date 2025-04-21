const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error('Database error:', err);
  } else {
    console.log('Connected to SQLite database (users.db)');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT UNIQUE,
      gender TEXT,
      birthdate TEXT,
      password TEXT
    )
  `);
});

app.post('/api/register', async (req, res) => {
  const { fullName, email, gender, birthdate, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (fullName, email, gender, birthdate, password) VALUES (?, ?, ?, ?, ?)`,
      [fullName, email, gender, birthdate, hashedPassword],
      (err) => {
        if (err) {
          return res.status(400).json({ error: 'Користувач із таким email уже існує' });
        }
        res.json({ message: 'Реєстрація успішна' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Неправильний email або пароль' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Неправильний email або пароль' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Вхід успішний', token });
  });
});

app.get('/api/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Токен відсутній' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    db.get(`SELECT id, fullName, email, gender, birthdate FROM users WHERE id = ?`, [decoded.id], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'Користувач не знайдений' });
      }
      res.json(user);
    });
  } catch (error) {
    res.status(401).json({ error: 'Невірний токен' });
  }
});

app.post('/api/logout', (req, res) => {
  res.json({ message: 'Вихід успішний' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});