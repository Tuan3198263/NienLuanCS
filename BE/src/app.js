// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./api/auth'); // Import router
const profileRoutes = require('./api/profile')
const userRoutes = require('./api/userRoutes');
const jobRoutes = require('./api/jobRoutes');  // Import jobRoutes
const companyRoutes = require("./api/companyRoutes")
const favoriteRoutes = require('./api/favoriteRoutes');
const applicationsRoutes = require('./api/applicationsRoutes')
const notificationRoutes = require('./api/notificationRoutes'); // Import route gửi thông báo
const checkloginRoutes = require('./api/checklogin')
const emailRoute = require("./api/emailRoute");
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
app.use('/api/profile', profileRoutes); // Sử dụng các từ profile.js
app.use('/api/users', userRoutes);
app.use('/api', jobRoutes);
app.use('/api', companyRoutes);
// Sử dụng route yêu thích
app.use('/api/favorites', favoriteRoutes);
app.use('/api/applications', applicationsRoutes);

// Sử dụng route gửi thông báo
app.use('/api/notifications', notificationRoutes);
app.use('/api/', checkloginRoutes);

app.use("/api/email", emailRoute); // Sử dụng route



// Route mặc định
app.get('/', (req, res) => {
    res.send('Hello World!1233243');
});




// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
