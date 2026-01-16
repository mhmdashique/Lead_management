# Lead Management Dashboard

A production-ready mini CRM application with lead management, search, filtering, analytics, and mobile-responsive UI.

## 🚀 Features

- **Authentication**: JWT-based login with demo credentials
- **Lead Management**: View, search, filter, and sort leads
- **Analytics Dashboard**: Real-time metrics (total leads, conversion rate, pipeline value)
- **Advanced Search**: Search by name, email, company with debounced input
- **Filtering**: Filter by status, source, assigned user, and date ranges
- **Sorting**: Sort by date, value, or name (ascending/descending)
- **Pagination**: Configurable items per page (10, 25, 50)
- **Responsive Design**: Mobile-first design with table/card views
- **Lead Details**: Detailed view of individual leads

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Faker.js** - Seed data generation

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **date-fns** - Date formatting

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier works)
- Git

## 🔧 Local Setup

### 1. Clone the Repository

```bash
cd "Lead managements"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/lead-management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database password

### 3. Seed Database

```bash
npm run seed
```

This will generate 750 realistic leads with:
- Weighted status distribution (40% New, 30% Contacted, 15% Qualified, 10% Converted, 5% Lost)
- Various lead sources (Website, LinkedIn, Referral, etc.)
- 8 sales reps
- Dates spread over past 12 months
- Estimated values: $1,000 - $100,000

### 4. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Content should be:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 6. Start Frontend Server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### 7. Login

Navigate to `http://localhost:3000` and login with:

```
Email: admin@crm.com
Password: admin123
```

## 📡 API Documentation

### Authentication

**POST** `/api/auth/login`
```json
{
  "email": "admin@crm.com",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "email": "admin@crm.com",
    "name": "Admin User"
  }
}
```

### Leads

**GET** `/api/leads`

Query Parameters:
- `search` - Search by name, email, company
- `leadStatus` - Filter by status (New, Contacted, Qualified, Converted, Lost)
- `leadSource` - Filter by source (Website, LinkedIn, etc.)
- `assignedTo` - Filter by assigned user
- `startDate` - Filter by creation date (from)
- `endDate` - Filter by creation date (to)
- `sortBy` - Sort field (createdAt, estimatedValue, lastName)
- `sortOrder` - Sort direction (asc, desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Response:
```json
{
  "data": [...],
  "total": 750,
  "page": 1,
  "totalPages": 75
}
```

**GET** `/api/leads/:id`

Returns single lead details.

### Analytics

**GET** `/api/analytics`

Response:
```json
{
  "totalLeads": 750,
  "convertedLeads": 75,
  "conversionRate": "10.00",
  "leadsByStatus": {
    "New": 300,
    "Contacted": 225,
    "Qualified": 112,
    "Converted": 75,
    "Lost": 38
  },
  "totalPipelineValue": 35000000,
  "leadsThisMonth": 45
}
```

## 🚀 Deployment

### Backend (Render)

1. Create account on [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend-url.vercel.app`
6. Deploy

### Frontend (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api`
5. Deploy

### Post-Deployment

1. Update backend `CORS_ORIGIN` with your Vercel URL
2. Run seed script on production (optional):
   ```bash
   # SSH into Render or use Render Shell
   node utils/seedData.js
   ```

## 📱 Mobile Responsiveness

- **Desktop (1024px+)**: Full table view with all columns
- **Tablet (768px-1023px)**: Optimized table layout
- **Mobile (<768px)**: Card-based layout

## 🧪 Testing

### Backend API Testing

Use Postman, Thunder Client, or curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'

# Get leads (with token)
curl http://localhost:5000/api/leads?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get analytics
curl http://localhost:5000/api/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Frontend Testing

1. Test authentication flow
2. Test search with various queries
3. Test filters (status, source, sorting)
4. Test pagination
5. Test lead details page
6. Test mobile responsiveness (Chrome DevTools)

## 🔒 Security Notes

- Demo uses hardcoded credentials for simplicity
- For production, implement:
  - User registration
  - Password hashing (bcrypt)
  - Refresh tokens
  - Rate limiting (already included)
  - Input validation (express-validator)
  - HTTPS only

## 📝 Project Structure

```
Lead managements/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leads.js
│   │   └── analytics.js
│   ├── utils/
│   │   └── seedData.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── leads/
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── AnalyticsCards.jsx
│   │   ├── Filters.jsx
│   │   ├── LeadsTable.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── .env.local.example
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## 🎯 Future Enhancements

- [ ] Add/Edit/Delete leads
- [ ] Export to CSV/Excel
- [ ] Email integration
- [ ] Activity timeline
- [ ] Advanced analytics charts
- [ ] User management
- [ ] Role-based access control
- [ ] Real-time notifications
- [ ] Dark mode

## 📄 License

MIT

## 👤 Author

Your Name - Portfolio Project

---

**Demo Credentials:**
- Email: `admin@crm.com`
- Password: `admin123`
