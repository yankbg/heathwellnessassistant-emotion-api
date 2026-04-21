const express = require('express');

//creation of the application
const app = express();

//tell app to understand json data
app.use(express.json());

//routefor testing 
app.get('/health', (req, res) => {
    res.json({status: 'success', message: 'Welcome to the Health and Wellness Assistant Emotion API!'});
});

//start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})