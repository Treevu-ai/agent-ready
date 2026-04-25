require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const rateLimiter = require('./middleware/rateLimiter');
const { handleContact } = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// Security: CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Allow localhost for development
        if (origin.includes('localhost')) return callback(null, true);
        
        // Allow the production domain
        if (origin.includes('agent-ready.consulting')) return callback(null, true);
        
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Contact form endpoint with rate limiting
app.post('/api/contact', rateLimiter, handleContact);

// Get submissions (admin only - simple auth via query param)
app.get('/api/submissions', (req, res) => {
    const { key } = req.query;
    
    // Simple API key protection (should use proper auth in production)
    if (key !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const dataFile = path.join(__dirname, 'data', 'submissions.json');
        if (!fs.existsSync(dataFile)) {
            return res.json([]);
        }
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        // Return newest first
        res.json(data.reverse());
    } catch (error) {
        res.status(500).json({ error: 'Failed to read submissions' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS error: Origin not allowed' });
    }
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`📧 Gmail account: ${process.env.GMAIL_USER || 'NOT SET'}`);
    console.log(`👤 Admin email: ${process.env.ADMIN_EMAIL || process.env.GMAIL_USER || 'NOT SET'}`);
    console.log(`🔒 Rate limit: ${process.env.RATE_LIMIT_WINDOW || 30}s per IP`);
});
