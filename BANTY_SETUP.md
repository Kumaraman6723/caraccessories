# Banty Car Accessories – Setup Guide

This guide covers the setup for the Banty Car Accessories website with:
- **Admin**: Google Sign-In (kumarprasadaman1234@gmail.com whitelisted)
- **Products**: Admin adds items with multiple images (Cloudinary)
- **Customer**: View products, click "Send Enquiry" → name, email, address, phone → emailed to admin + auto-reply to customer

---

## 1. Google OAuth (Admin Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Go to **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**
4. Application type: **Web application**
5. Authorized JavaScript origins: `http://localhost:5173` (and your production URL)
6. Copy the **Client ID**

**Frontend** – create `.env` in project root:
```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

**Server** – add to `Server/.env`:
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
ADMIN_EMAILS=kumarprasadaman1234@gmail.com
ADMIN_GMAIL=kumarprasadaman1234@gmail.com
BANTY_CONTACT_PHONE=9876543210
```

---

## 2. Cloudinary (Product Images)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy **Cloud Name**, **API Key**, **API Secret** from dashboard

Add to `Server/.env`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Images are stored in the `banty-car-accessories` folder in Cloudinary.

---

## 3. Nodemailer (Emails)

1. Use Gmail with an [App Password](https://support.google.com/accounts/answer/185833)
2. Enable 2-Step Verification on the Google account
3. Generate an App Password under Security → App passwords

Add to `Server/.env`:
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=kumarprasadaman1234@gmail.com
MAIL_PASS=your-16-char-app-password
MAIL_FROM_NAME=Banty Car Accessories
```

---

## 4. Run the App

```bash
# Install dependencies
npm install
cd Server && npm install && cd ..

# Run client + server together
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000  

---

## 5. Flow Summary

| Role     | Action |
|----------|--------|
| **Admin** | Sign in at `/admin/login` with Google (kumarprasadaman1234@gmail.com) |
| **Admin** | Add products at `/admin/products` with name, price, category, multiple images (Cloudinary) |
| **Customer** | Browse `/shop`, view product details at `/product/:id` |
| **Customer** | Click "Send Enquiry" → enter name, email, phone, address → submit |
| **System** | Sends enquiry to admin Gmail + auto-reply to customer ("We received your request. If urgent call 9876543210") |

---

## 6. Add More Admins

To allow more admin emails, set in `Server/.env`:
```env
ADMIN_EMAILS=kumarprasadaman1234@gmail.com,second-admin@gmail.com
```
