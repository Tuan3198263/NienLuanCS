// index.js
const express = require('express');
const app = express();

// Cổng lắng nghe
const port = 3000;

// Route mặc định
app.get('/', (req, res) => {
    res.send('Hello World!1233243');
});

// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
