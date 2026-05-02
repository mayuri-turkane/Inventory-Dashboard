const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const pool   = require('../config/db');

// Middleware: checks JWT token before allowing access
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access denied. No token.' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};

// GET /api/dashboard-data (protected!)
router.get('/dashboard-data', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const [items] = await pool.query(
            'SELECT * FROM data_items WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        const [[{ totalItems }]] = await pool.query(
            'SELECT COUNT(*) AS totalItems FROM data_items WHERE user_id = ?',
            [userId]
        );
        res.json({ items, stats: { totalItems } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/items (add new item)
router.post('/items', verifyToken, async (req, res) => {
    const { title, description, category, quantity } = req.body;
    await pool.query(
        'INSERT INTO data_items (user_id,title,description,category,quantity) VALUES (?,?,?,?,?)',
        [req.user.id, title, description, category, quantity || 1]
    );
    res.status(201).json({ message: 'Item added' });
});

module.exports = router;