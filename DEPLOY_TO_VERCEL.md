# 🚀 Vercel Deployment - Step-by-Step Guide

## Prerequisites
- ✅ GitHub repository: https://github.com/Mukesh1q2/Konnichiwa.git
- ✅ Environment variables ready in `.env` file
- ✅ Vercel account (free tier works)

---

## 📝 Step-by-Step Deployment Process

### **Step 1: Go to Vercel**
1. Open your browser and go to: **https://vercel.com/new**
2. Sign in with your GitHub account (if not already signed in)

### **Step 2: Import Your Repository**
1. Click **"Import Git Repository"**
2. Find and select: **`Mukesh1q2/Konnichiwa`**
3. Click **"Import"**

### **Step 3: Configure Project**
1. **Project Name:** `konnichiwa-japan` (or your preferred name)
2. **Framework Preset:** Next.js (should auto-detect)
3. **Root Directory:** `./` (leave as default)
4. **Build Command:** `npm run build` (leave as default)
5. **Output Directory:** `.next` (leave as default)

### **Step 4: Add Environment Variables** ⚠️ IMPORTANT

**Option A: Import .env File (Recommended)**
1. Click **"Environment Variables"** section
2. Click **"Add .env file"** or **"Bulk Add"**
3. Open your local `.env` file
4. Copy ALL contents
5. Paste into Vercel
6. Click **"Add"**

**Option B: Manual Entry**
Add these one by one:
```
DATABASE_URL=your_value
DIRECT_URL=your_value
NEXT_PUBLIC_SUPABASE_URL=your_value
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value
SUPABASE_SERVICE_ROLE_KEY=your_value
JWT_SECRET=your_value
NEXTAUTH_SECRET=your_value
NEXTAUTH_URL=https://your-app.vercel.app
RAZORPAY_KEY_ID=your_value
RAZORPAY_KEY_SECRET=your_value
RAZORPAY_WEBHOOK_SECRET=your_value
STRIPE_SECRET_KEY=your_value
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_value
STRIPE_WEBHOOK_SECRET=your_value
PAYPAL_CLIENT_ID=your_value
PAYPAL_CLIENT_SECRET=your_value
PAYPAL_WEBHOOK_ID=your_value
SMTP_HOST=your_value
SMTP_PORT=your_value
SMTP_USER=your_value
SMTP_PASS=your_value
FROM_EMAIL=your_value
SENDGRID_API_KEY=your_value
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_value
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME="Konnichiwa Japan & Namaste India"
NODE_ENV=production
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
BCRYPT_ROUNDS=12
SESSION_TIMEOUT=3600000
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=1800000
```

### **Step 5: Deploy!**
1. Click **"Deploy"** button
2. Wait 2-5 minutes for build to complete
3. ✅ Your site will be live at: `https://your-app.vercel.app`

---

## 🔧 After Deployment

### **1. Update Production URLs**
Once deployed, go back to Vercel dashboard:
1. Project Settings > Environment Variables
2. Update these variables with your actual Vercel URL:
   - `NEXTAUTH_URL` → `https://your-actual-domain.vercel.app`
   - `NEXT_PUBLIC_APP_URL` → `https://your-actual-domain.vercel.app`
3. Redeploy (Deployments tab > click "..." > Redeploy)

### **2. Configure Webhooks**
Update webhook URLs in your payment provider dashboards:

**Stripe:**
- Dashboard: https://dashboard.stripe.com/webhooks
- Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`

**Razorpay:**
- Dashboard: https://dashboard.razorpay.com/app/webhooks
- Add endpoint: `https://your-app.vercel.app/api/webhooks/razorpay`

**PayPal:**
- Dashboard: https://developer.paypal.com/dashboard/webhooks
- Add endpoint: `https://your-app.vercel.app/api/webhooks/paypal`

### **3. Test Your Deployment**
- [ ] Visit your site
- [ ] Test navigation
- [ ] Test brand switching
- [ ] Try authentication (if enabled)
- [ ] Check payment flow (in test mode)
- [ ] Verify email sending

---

## 🐛 Troubleshooting

### Build Fails?
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Check for missing dependencies in `package.json`

### Site Loads but Features Don't Work?
1. Check browser console for errors
2. Verify environment variables in Vercel dashboard
3. Check that production URLs are updated

### Database Connection Issues?
1. Verify Supabase URLs are correct
2. Check Supabase service role key
3. Ensure database is accessible from Vercel

---

## 📊 Deployment Checklist

- [ ] GitHub repository is up to date
- [ ] All environment variables copied from `.env`
- [ ] NEXTAUTH_URL set to production domain
- [ ] NEXT_PUBLIC_APP_URL set to production domain
- [ ] NODE_ENV set to "production"
- [ ] Deployment successful
- [ ] Site is accessible
- [ ] Production URLs updated in Vercel
- [ ] Webhooks configured in payment providers
- [ ] Basic functionality tested

---

## 🎯 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your GitHub Repo:** https://github.com/Mukesh1q2/Konnichiwa
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

## 💡 Pro Tips

1. **Use Preview Deployments:** Every PR creates a preview deployment
2. **Environment Variables:** Set different values for Production/Preview/Development
3. **Custom Domain:** Add your own domain in Project Settings > Domains
4. **Analytics:** Enable Vercel Analytics for free
5. **Monitoring:** Check deployment logs regularly

---

**Ready to deploy? Follow the steps above!** 🚀

If you encounter any issues, check the Vercel build logs for specific error messages.
