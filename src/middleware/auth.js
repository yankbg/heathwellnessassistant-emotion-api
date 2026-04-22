const authenticate = (req, res, next) => {
    const apikey = req.headers['x-api-key'];
    if (!apikey) {
        return res.status(401).json({ 
            success: false,
            message: 'API key is missing' 
        });
    }
    if (apikey !== process.env.API_KEY) {
        return res.status(401).json({ 
            success: false,
            message: 'Invalid API key'
        });
    }
    next();
};
module.exports = authenticate;