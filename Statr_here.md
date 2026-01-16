# ⚡ FINAL SETUP STEPS

## You Need MongoDB Atlas (Free & Takes 5 Minutes)

### Quick Steps:

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (use Google for fastest)
3. **Create FREE cluster** (M0 Sandbox)
4. **Create database user:**
   - Username: `admin`
   - Password: `admin123` (or auto-generate)
5. **Network Access:** Click "Allow Access from Anywhere"
6. **Get connection string:** Click "Connect" → "Connect your application"
7. **Copy the string** (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Update backend/.env:

Replace the MONGODB_URI line with YOUR connection string:
```
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/lead-management?retryWrites=true&w=majority
```

**Important:** 
- Replace `<password>` with your actual password
- Add `/lead-management` before the `?`

---

## Then Run:

### Terminal 1:
```bash
cd backend
npm run seed
npm run dev
```

### Terminal 2:
```bash
cd frontend
npm run dev
```

### Browser:
http://localhost:3000

Login: admin@crm.com / admin123

---

## Alternative: Use Local MongoDB

If you don't want cloud, install MongoDB locally:
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Update .env: `MONGODB_URI=mongodb://localhost:27017/lead-management`
4. Run the commands above
