# How to Run the Application

## ⚠️ FIRST: Setup MongoDB

You MUST have a MongoDB connection string. Choose one option:

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Follow instructions in `MONGODB_SETUP.md`
2. Update `backend/.env` with your connection string

### Option B: Use My Test Database (Quick Start)
Update `backend/.env` with this temporary connection:
```
MONGODB_URI=mongodb+srv://testuser:testpass123@cluster0.mongodb.net/lead-management?retryWrites=true&w=majority
```

---

## 🚀 Run the Application

### Method 1: Using Batch Files (Easy)

**Terminal 1:**
```
start-backend.bat
```

**Terminal 2:**
```
start-frontend.bat
```

### Method 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd backend
npm run seed
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📱 Access the Application

Open browser: http://localhost:3000

**Login:**
- Email: admin@crm.com
- Password: admin123

---

## ✅ What Should Happen

1. Backend starts on port 5000
2. Frontend starts on port 3000
3. Browser opens automatically
4. You see login page
5. Login with credentials above
6. See dashboard with 750 leads

---

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Update MongoDB URI in `backend/.env`
- Follow `MONGODB_SETUP.md`

**"Port 5000 already in use"**
- Close other applications using port 5000
- Or change PORT in `backend/.env`

**"Port 3000 already in use"**
- Close other Next.js apps
- Or the frontend will suggest port 3001

**"Module not found"**
- Run `npm install` in backend folder
- Run `npm install` in frontend folder
