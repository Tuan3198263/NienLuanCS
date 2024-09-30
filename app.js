// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./api/auth'); // Import router
const connectToDatabase = require('./db'); // Import function kết nối

const app = express();

// Cổng lắng nghe
const port = 3000;
// connect dtb
connectToDatabase();

// Cấu hình CORS
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Chấp nhận JSON từ body
// Middleware để phân tích JSON
app.use(express.json());

// Sử dụng các route từ auth.js
app.use('/api', authRoutes);


// Route mặc định
app.get('/', (req, res) => {
    res.send('Hello World!1233243');
});

// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
