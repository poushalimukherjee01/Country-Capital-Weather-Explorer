# 🔓 Vercel Settings Guide - Making Your API Public

This guide will help you ensure your Vercel deployment is publicly accessible without authentication.

## ✅ Settings to Check in Vercel Dashboard

### 1. **Password Protection (MOST IMPORTANT)**

This is the most common reason why recruiters can't access your API.

**Steps to disable:**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Deployment Protection**
4. Look for **"Password Protection"** or **"Vercel Authentication"**
5. **Disable** any password protection or authentication
6. Make sure it's set to **"Public"** or **"No Protection"**

**Note:** If you see "Vercel Authentication" enabled, turn it OFF for public access.

---

### 2. **Deployment Visibility**

1. Go to **Settings** → **General**
2. Check **"Deployment Visibility"**
3. Ensure it's set to **"Public"** (not "Private" or "Team Only")

---

### 3. **Environment Variables**

While environment variables don't block access, make sure:
1. Go to **Settings** → **Environment Variables**
2. Verify `OPENWEATHER_API_KEY` is set correctly
3. Make sure it's available for **Production**, **Preview**, and **Development** environments

---

### 4. **Domain Settings**

1. Go to **Settings** → **Domains**
2. Ensure your domain is properly configured
3. If using a custom domain, check DNS settings

---

### 5. **Function Settings**

1. Go to **Settings** → **Functions**
2. Check **"Serverless Function Execution Timeout"** (should be fine at default)
3. Ensure no rate limiting is blocking requests

---

## 🧪 How to Verify It's Public

After making these changes:

1. **Test in Incognito/Private Browser Window:**
   - Open a new incognito window
   - Visit: `https://your-app.vercel.app/api/test`
   - You should see JSON response without any login prompt

2. **Test with cURL (no authentication):**
   ```bash
   curl https://your-app.vercel.app/api/test
   ```
   Should return JSON, not an authentication error.

3. **Test from Different Network:**
   - Try accessing from your phone (not on same WiFi)
   - Or ask someone else to test the URL

---

## ⚠️ Common Issues

### Issue: "401 Unauthorized" or "403 Forbidden"
**Solution:** Check Password Protection settings (Step 1 above)

### Issue: "Please log in" prompt appears
**Solution:** Disable Vercel Authentication in Deployment Protection settings

### Issue: API works for you but not for others
**Solution:** You might be logged into Vercel. Test in incognito mode or ask someone else to test.

### Issue: CORS errors
**Solution:** Already handled in code, but if issues persist, check browser console for specific CORS errors.

---

## 📝 Quick Checklist

Before sharing with recruiters, verify:
- [ ] Password Protection is **DISABLED**
- [ ] Vercel Authentication is **DISABLED** (if present)
- [ ] Deployment Visibility is set to **PUBLIC**
- [ ] `/api/test` endpoint works in incognito browser
- [ ] `/api/weather?q=London` works in incognito browser
- [ ] No login prompts appear when accessing URLs

---

## 🔗 Your API Endpoints (After Making Public)

Once settings are correct, these should work without authentication:

- **Test:** `https://your-app.vercel.app/api/test`
- **Weather:** `https://your-app.vercel.app/api/weather?q=London`
- **Root:** `https://your-app.vercel.app/`

---

## 💡 Pro Tip

If you want to keep password protection for the main site but make API public, you can:
1. Keep password protection ON for the root domain
2. But API endpoints (`/api/*`) should still be accessible
3. However, Vercel's password protection applies to the entire deployment, so you'll need to disable it for full public access.

---

**Need Help?** If you're still having issues after checking these settings, the most likely culprit is **Password Protection** in the Deployment Protection section.
