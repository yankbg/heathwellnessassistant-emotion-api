require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

//creation of the application
const app = express();

//security middleware
app.use(helmet());
app.use(cors());
// Rate limiting — max 60 requests per minute per IP
app.use(rateLimit({
    windowMs: 60 * 1000, 
    max: 60, // limit each IP to 60 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    }
}));


//tell app to understand json data
app.use(express.json({limit: '50kb'}));

//routefor testing 
app.get('/health', (req, res) => {
    res.json({status: 'success', message: 'Welcome to the Health and Wellness Assistant Emotion API!'});
});


app.use('/api', routes);

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

//start the server
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});