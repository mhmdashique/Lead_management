# Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure MongoDB
Edit `backend/.env` and replace the MongoDB URI with your connection string:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/lead-management
```

**Don't have MongoDB?**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 3: Seed Database
```bash
npm run seed
```
✅ This creates 750 sample leads

### Step 4: Start Backend
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 5: Install Frontend Dependencies
Open a NEW terminal:
```bash
cd frontend
npm install
```

### Step 6: Start Frontend
```bash
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 7: Login
Open http://localhost:3000 in your browser

**Login Credentials:**
- Email: `admin@crm.com`
- Password: `admin123`

---

## 🎉 You're Done!

You should now see:
- ✅ Analytics dashboard with metrics
- ✅ 750 leads in the table
- ✅ Search, filter, and sort functionality
- ✅ Pagination controls
- ✅ Click any lead to view details

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in `backend/.env`
- Make sure port 5000 is not in use
- Run `npm install` again

### Frontend won't start
- Check if backend is running first
- Make sure port 3000 is not in use
- Run `npm install` again

### Can't login
- Make sure backend is running
- Check browser console for errors
- Verify credentials: `admin@crm.com` / `admin123`

### No leads showing
- Run the seed script: `cd backend && npm run seed`
- Check MongoDB connection
- Refresh the page

---

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Test the search and filter features
3. Try mobile view (resize browser or use DevTools)
4. Explore the API endpoints
5. Deploy to production (see README.md)

---

## 🚀 Production Deployment

### Quick Deploy to Render + Vercel (Free)

**Backend (Render):**
1. Push code to GitHub
2. Go to https://render.com
3. New Web Service → Connect repo
4. Root Directory: `backend`
5. Build: `npm install`
6. Start: `npm start`
7. Add environment variables from `.env`

**Frontend (Vercel):**
1. Go to https://vercel.com
2. Import GitHub repo
3. Root Directory: `frontend`
4. Framework: Next.js
5. Add env: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

Done! Your app is live 🎉
