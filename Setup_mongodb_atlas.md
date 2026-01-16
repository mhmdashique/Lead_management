# MongoDB Atlas Setup - Quick Guide

## 🚀 Get Your MongoDB Connection String (5 minutes)

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose FREE tier (M0)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region close to you
5. Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `leaduser`
5. Password: Click "Autogenerate Secure Password" (COPY THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://leaduser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied in Step 3

### Step 6: Update Your .env File
Open `backend/.env` and replace the MONGODB_URI line with your connection string:

```env
MONGODB_URI=mongodb+srv://leaduser:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/lead-management?retryWrites=true&w=majority
```

**IMPORTANT:** Make sure to add `/lead-management` before the `?` in the connection string!

---

## ✅ After Setup, Run These Commands:

### Terminal 1 - Backend:
```bash
cd backend
npm run seed    # Generate 750 sample leads
npm run dev     # Start backend server
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev     # Start frontend server
```

### Open Browser:
http://localhost:3000

Login: admin@crm.com / admin123

---

## 🆘 Need Help?

**Can't create account?**
- Try using Google/GitHub sign-in
- Use a different email

**Cluster creation stuck?**
- Wait 3-5 minutes
- Refresh the page

**Connection string not working?**
- Make sure you replaced `<password>` with actual password
- Check for extra spaces
- Ensure `/lead-management` is added before `?`

**Still having issues?**
- Try "Allow Access from Anywhere" in Network Access
- Check Database User was created successfully
- Verify password doesn't have special characters that need encoding
