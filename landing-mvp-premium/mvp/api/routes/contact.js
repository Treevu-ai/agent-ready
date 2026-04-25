const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const DATA_FILE = path.join(__dirname, '..', 'data', 'submissions.json');

// Ensure data file exists
function initStorage() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save submission to JSON file
function saveSubmission(data) {
    initStorage();
    const submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    submissions.push({
        ...data,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        createdAt: new Date().toISOString()
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return data;
}

// Configure email transporter
function createTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
}

// Send notification email to admin
async function sendAdminNotification(data) {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    
    const mailOptions = {
        from: `"agent-ready Website" <${process.env.GMAIL_USER}>`,
        to: adminEmail,
        subject: `Nuevo lead: ${data.name} - ${data.company || 'Sin empresa'}`,
        html: `
            <h2>Nuevo contacto desde agent-ready</h2>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Empresa:</strong> ${data.company || 'No especificada'}</p>
            <p><strong>Interés:</strong> ${data.interest}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${data.message}</p>
            <hr>
            <p><strong>Fecha:</strong> ${data.createdAt}</p>
            <p><strong>ID:</strong> ${data.id}</p>
        `
    };
    
    await transporter.sendMail(mailOptions);
}

// Send auto-reply to user
async function sendUserAutoReply(data) {
    const transporter = createTransporter();
    const isSpanish = data.lang === 'es';
    
    const subject = isSpanish 
        ? 'Hemos recibido tu mensaje - agent-ready'
        : 'We received your message - agent-ready';
    
    const body = isSpanish ? `
        <h2>¡Hola ${data.name}! 👋</h2>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.</p>
        <p>Mientras tanto, puedes:</p>
        <ul>
            <li>Visitar nuestro sitio: <a href="https://agent-ready.consulting">agent-ready.consulting</a></li>
            <li>Escribirnos por WhatsApp: +51 903 176 598</li>
        </ul>
        <p>Saludos,<br>El equipo de agent-ready</p>
    ` : `
        <h2>Hello ${data.name}! 👋</h2>
        <p>Thank you for reaching out. We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, you can:</p>
        <ul>
            <li>Visit our website: <a href="https://agent-ready.consulting">agent-ready.consulting</a></li>
            <li>Message us on WhatsApp: +51 903 176 598</li>
        </ul>
        <p>Best regards,<br>The agent-ready team</p>
    `;
    
    const mailOptions = {
        from: `"agent-ready" <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: subject,
        html: body
    };
    
    await transporter.sendMail(mailOptions);
}

// Main handler
async function handleContact(req, res) {
    try {
        const { name, email, company, interest, message, lang } = req.body;
        
        // Validation
        const errors = [];
        
        if (!name || name.trim().length < 2) {
            errors.push('Name is required (min 2 characters)');
        }
        
        if (!email || !isValidEmail(email)) {
            errors.push('Valid email is required');
        }
        
        if (!interest) {
            errors.push('Interest selection is required');
        }
        
        if (!message || message.trim().length < 10) {
            errors.push('Message is required (min 10 characters)');
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }
        
        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email.toLowerCase()),
            company: sanitizeInput(company || ''),
            interest: sanitizeInput(interest),
            message: sanitizeInput(message),
            lang: lang === 'en' ? 'en' : 'es'
        };
        
        // Save to storage
        const savedData = saveSubmission(sanitizedData);
        
        // Send emails (don't fail if email fails)
        try {
            await Promise.all([
                sendAdminNotification(savedData),
                sendUserAutoReply(savedData)
            ]);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue - submission is saved even if email fails
        }
        
        return res.status(200).json({
            success: true,
            message: 'Message received successfully',
            id: savedData.id
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

module.exports = { handleContact };
