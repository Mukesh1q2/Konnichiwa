# Vercel Deployment Checklist

## 📋 Environment Variables Status

Based on your current `.env` file, here's what needs to be updated before deploying to Vercel:

### ⚠️ MUST UPDATE (Currently Placeholders):

1. **SMTP_PASS** - Currently: `your-app-password`
   - Get from: Gmail App Password (if using Gmail)
   - Or your email provider's SMTP credentials

2. **PayPal Credentials** - Currently contain placeholders
   - `PAYPAL_CLIENT_ID` 
   - `PAYPAL_CLIENT_SECRET`
   - Get from: https://developer.paypal.com/

### ❌ MISSING (Need to Add):

3. **SENDGRID_API_KEY** - Not in your `.env` file
   - Required for email functionality
   - Get from: https://app.sendgrid.com/settings/api_keys
   - Format: `SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxx`

4. **SUPABASE_SERVICE_ROLE_KEY** - May need production value
   - Get from: Supabase Dashboard > Settings > API

### ✅ READY (Appear to be configured):

- Database URLs (PostgreSQL/Supabase)
- JWT & NextAuth secrets
- Razorpay credentials
- Stripe credentials
- SMTP host/port/user
- Google Analytics
- App configuration

---

## 🚀 Vercel Deployment Steps

### Option 1: Import .env File (Recommended)

1. **Update Missing Variables First:**
   ```bash
   # Add to your .env file:
   SENDGRID_API_KEY=SG.your_actual_key
   SMTP_PASS=your_actual_password
   PAYPAL_CLIENT_ID=your_actual_client_id
   PAYPAL_CLIENT_SECRET=your_actual_secret
   ```

2. **Update Production URLs:**
   ```bash
   # Change these for production:
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

3. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - In "Environment Variables" section, click "Add .env file"
   - Copy-paste your entire `.env` file content
   - Click "Deploy"

### Option 2: Manual Entry

1. Go to Vercel Dashboard
2. Select your project
3. Settings > Environment Variables
4. Add each variable manually

---

## 🔐 Security Checklist

- [x] `.env` file is in `.gitignore` ✅
- [ ] Update all placeholder values
- [ ] Use production API keys (not test keys)
- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable Stripe webhook in production
- [ ] Enable Razorpay webhook in production
- [ ] Configure SendGrid sender authentication

---

## 📝 Quick Action Items

**Before Deploying:**

1. ✏️ Update SMTP_PASS with real password
2. ✏️ Add SENDGRID_API_KEY
3. ✏️ Update PayPal credentials (if using PayPal)
4. ✏️ Change NEXTAUTH_URL to production URL
5. ✏️ Change NEXT_PUBLIC_APP_URL to production URL

**After Deploying:**

1. Test payment gateways
2. Test email sending
3. Verify authentication works
4. Check database connections
5. Monitor error logs

---

## 🎯 Current Status Summary

- **Total Variables:** 37
- **Ready to Deploy:** ~30
- **Need Updates:** 4-5
- **Estimated Time to Fix:** 15-30 minutes

---

## 💡 Pro Tips

1. **Vercel allows importing .env directly** - Just copy-paste the entire file
2. **Use different API keys for production** - Don't use test keys
3. **Set up Vercel environment variables in 3 environments:**
   - Production
   - Preview
   - Development
4. **After first deployment, update webhook URLs** in Stripe/Razorpay/PayPal dashboards

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- SendGrid API Keys: https://app.sendgrid.com/settings/api_keys
- Stripe Dashboard: https://dashboard.stripe.com/
- Razorpay Dashboard: https://dashboard.razorpay.com/
- PayPal Developer: https://developer.paypal.com/
- Supabase Dashboard: https://app.supabase.com/

---

**Ready to deploy once you update the 4-5 placeholder values!** 🚀
