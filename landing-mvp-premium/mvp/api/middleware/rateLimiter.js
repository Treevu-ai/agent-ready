// Simple in-memory rate limiter
const requestMap = new Map();

const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 30; // seconds

function rateLimiter(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    const windowMs = RATE_LIMIT_WINDOW * 1000;
    
    if (requestMap.has(ip)) {
        const lastRequest = requestMap.get(ip);
        if (now - lastRequest < windowMs) {
            const remaining = Math.ceil((windowMs - (now - lastRequest)) / 1000);
            return res.status(429).json({
                error: 'Too many requests',
                message: `Please wait ${remaining} seconds before submitting again.`,
                retryAfter: remaining
            });
        }
    }
    
    requestMap.set(ip, now);
    
    // Cleanup old entries every 100 requests
    if (requestMap.size > 100) {
        const cutoff = now - windowMs;
        for (const [key, timestamp] of requestMap.entries()) {
            if (timestamp < cutoff) {
                requestMap.delete(key);
            }
        }
    }
    
    next();
}

module.exports = rateLimiter;
