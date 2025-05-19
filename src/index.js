const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/auth/auth');
app.use('/', authRoutes);

const notFound = require('./middleware/notFound');
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



