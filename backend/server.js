const express = require('express');
const cors    = require('cors');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '.env')
});



const authRoutes      = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

console.log("ENV CHECK:", process.env.DB_USER, process.env.DB_PASSWORD);

console.log("CURRENT DIR:", process.cwd());

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api',      dashboardRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));