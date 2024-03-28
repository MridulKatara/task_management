const express = require('express');
const cors = require('cors');

const connection = require("./config/db");
const authRouter = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth.Middleware');
const taskRouter = require('./routes/taskRoutes');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/task', authMiddleware, taskRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await connection;

        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error connecting to MongoDB:");
        console.error(error);
    }
});
