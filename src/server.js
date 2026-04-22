require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');

//creation of the application
const app = express();

//tell app to understand json data
app.use(express.json());

//routefor testing 
app.get('/health', (req, res) => {
    res.json({status: 'success', message: 'Welcome to the Health and Wellness Assistant Emotion API!'});
});


app.use('/api', routes);

//start the server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});