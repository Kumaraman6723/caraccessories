# Cloudinary Setup for EcoShare Hub

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your Cloudinary Credentials

1. Log in to your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy the following values:
   - **Cloud Name**: Found in the "Account Details" section
   - **API Key**: Found in the "Account Details" section
   - **API Secret**: Found in the "Account Details" section

## 3. Configure Environment Variables

Create a `.env` file in the `Server` directory with the following:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

## 4. Features Included

- ✅ **Image Upload**: Upload images to Cloudinary with automatic optimization
- ✅ **Image Deletion**: Automatically delete images when resources are deleted
- ✅ **Optimization**: Automatic quality and format optimization
- ✅ **Folder Organization**: Images are organized in the 'ecoshare-hub' folder
- ✅ **Error Handling**: Graceful error handling for upload failures

## 5. Image Storage Structure

```
Cloudinary Account
└── ecoshare-hub/
    ├── resource-images/
    │   ├── image1.jpg
    │   ├── image2.png
    │   └── ...
    └── user-uploads/
        └── ...
```

## 6. Supported Formats

- **Images**: JPG, PNG, GIF, WebP, AVIF
- **Videos**: MP4, WebM, MOV (if needed)
- **Documents**: PDF (if needed)

## 7. Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Uploads**: 500 images/month

## 8. Security Notes

- Never commit your `.env` file to version control
- Keep your API secret secure
- Use environment variables in production
- Consider using Cloudinary's signed uploads for production

## 9. Testing

After setup, test the image upload functionality:

1. Create a new resource with images
2. Check your Cloudinary dashboard to see uploaded images
3. Delete a resource and verify images are removed from Cloudinary
