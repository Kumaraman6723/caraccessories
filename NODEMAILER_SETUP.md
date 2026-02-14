# Nodemailer Setup Guide

## Overview
The contact form is now integrated with Nodemailer to send emails to `ajeetgupt1982@gmail.com` when users submit the contact form.

## Required Environment Variables

Add the following variables to your `Server/.env` file:

```env
PORT=5000

# Nodemailer Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM_NAME=LostFound
```

## Gmail Setup Instructions

### Step 1: Enable 2-Step Verification
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to Google Account → Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Enter "LostFound" as the custom name
5. Click "Generate"
6. Copy the 16-character password (this is your `MAIL_PASS`)

### Step 3: Configure .env File
Update `Server/.env` with:
- `MAIL_USER`: Your Gmail address (e.g., `your-email@gmail.com`)
- `MAIL_PASS`: The 16-character app password from Step 2
- `MAIL_HOST`: `smtp.gmail.com`
- `MAIL_PORT`: `587`

## Alternative Email Providers

### Outlook/Hotmail
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USER=your-email@outlook.com
MAIL_PASS=your-password
```

### Yahoo Mail
```env
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USER=your-email@yahoo.com
MAIL_PASS=your-app-password
```

### Custom SMTP Server
```env
MAIL_HOST=your-smtp-server.com
MAIL_PORT=587
MAIL_USER=your-email@domain.com
MAIL_PASS=your-password
```

## Testing

1. Start the server:
   ```bash
   cd Server
   npm run dev
   ```

2. Start the frontend:
   ```bash
   npm run start-client
   ```

3. Navigate to the contact form and submit a test message

4. Check `ajeetgupt1982@gmail.com` for the email

## Troubleshooting

### Error: "Invalid login"
- Make sure you're using an App Password for Gmail, not your regular password
- Verify 2-Step Verification is enabled

### Error: "Connection timeout"
- Check your firewall settings
- Verify MAIL_HOST and MAIL_PORT are correct
- Try using port 465 with `secure: true` in mailSender.js

### Error: "Authentication failed"
- Double-check MAIL_USER and MAIL_PASS in .env
- Ensure no extra spaces in the .env file
- Restart the server after changing .env

## Files Created/Modified

1. `Server/utils/mailSender.js` - Nodemailer utility function
2. `Server/templates/contactFormSubmission.js` - Email template
3. `Server/index.js` - Added `/api/contact` route
4. `src/Components/Sections/Contact.jsx` - Added form handling
5. `src/App.jsx` - Added ToastContainer for notifications

## API Endpoint

**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you soon!"
}
```
