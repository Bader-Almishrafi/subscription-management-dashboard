# 📊 Subscription Management Dashboard

A full-stack web application to **track and analyze subscription services**.  
The dashboard helps users stay on top of recurring expenses, avoid unexpected renewals, and discover potential savings by comparing billing cycles.

---

## 🚀 Features

- ➕ **Add & Edit Subscriptions** (name, cost, billing cycle, start/renewal dates, category)
- 📅 **Renewal Reminders** → Highlights subscriptions renewing in the next 7 days
- 💰 **Spending Insights**:
  - Total monthly spend
  - Projected yearly cost
  - Category breakdown
- 📊 **Charts & Analytics**:
  - Monthly spend trends
  - Spend distribution by category
  - Potential yearly savings when switching from monthly to yearly billing
- ❌ **Cancel Subscriptions** (soft delete → mark inactive instead of removing from DB)
- ✅ **Responsive Modern UI** with TailwindCSS + Recharts

---

## 🛠️ Tech Stack

### Backend
- [Django](https://www.djangoproject.com/) + [Django REST Framework](https://www.django-rest-framework.org/)
- SQLite (demo) – easily swappable with PostgreSQL/MySQL
- Renewal date auto-calculation using `dateutil.relativedelta`

### Frontend
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/en-US/) for visualizations
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons
- Axios for API calls

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```
git clone https://github.com/Bader-Almishrafi/subscription-management-dashboard.git
cd subscription-management-dashboard
```
2️⃣ Backend Setup (Django)
```
cd Backend
python -m venv venv
# Activate the venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
➡ Backend available at: http://127.0.0.1:8000

3️⃣ Frontend Setup (React)
```
cd ../frontend
npm install
npm start
```
➡ Frontend available at: http://localhost:3000

📡 API Endpoints

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| GET    | `/api/subscriptions/`       | List all subscriptions         |
| POST   | `/api/subscriptions/`       | Add new subscription           |
| PUT    | `/api/subscriptions/{id}/`  | Update subscription            |
| DELETE | `/api/subscriptions/{id}/`  | Cancel subscription (inactive) |
| GET    | `/api/subscriptions/stats/` | Spending & savings analytics   |

📊 Example Analytics

Monthly Spend: 183.66 SAR

Projected Yearly Spend: 2200.00 SAR

Upcoming Renewals: Subscriptions within next 7 days

Potential Savings: Compare monthly vs yearly billing

🔮 Future Improvements:

🔐 Authentication (multi-user support)

📧 Email & push notifications for renewals

📤 Export data (CSV/Excel)

☁ Deployment to Heroku/Render with PostgreSQL

🏷️ Tags & filtering for subscriptions

📖 Documentation

See DECISIONS.md for architectural choices, debugging process, and trade-offs.

👨‍💻 Author

Bader Abdulaziz Al-Mutairi

Software Engineer | Full-Stack Developer 
