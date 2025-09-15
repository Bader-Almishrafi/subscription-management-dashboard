🧠 Learning Journey

Before this project, I had no prior experience with Django. To complete the assessment, I relied on two main learning resources:

YouTube: Django & React – Full Stack Web App Tutorial by Tech With Tim (https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j)

AI Tools (ChatGPT): for guidance, code snippets, and debugging help.

I did not just copy solutions. Instead, I:

Watched the tutorials to understand Django models, REST APIs, and integration with React.

Used AI to generate drafts or clarify errors.

Validated every suggestion by testing it in my codebase and adapting it to fit the assignment’s requirements.

This approach showed me that I can quickly learn new frameworks under pressure, while still making informed technical decisions.

🏗️ Architectural Decisions
Backend

Framework: Django + Django REST Framework

Reason: Provides fast API development and powerful built-in features.

Trade-off: Steeper learning curve since I was new to Django.

Model Design: Subscription with fields:

name, category, cost, billing_cycle, start_date, renewal_date, is_active

Added is_active for soft deletes (so analytics stay accurate).

Auto-calculates renewal_date if not provided.

Stats Endpoint: /api/subscriptions/stats/

Provides monthly cost, projected yearly cost, upcoming renewals, and potential yearly savings.

Used Django’s aggregation and custom logic for comparisons.

Frontend

Framework: React (my comfort zone).

Styling: TailwindCSS (fast prototyping, responsive design).

Charts: Recharts for data visualization (intuitive API).

Animation: Framer Motion for smoother UI transitions.

🐛 Challenges & Debugging

CORS errors: React couldn’t reach Django API → solved with django-cors-headers.

Renewal date logic: Sometimes empty → fixed in save() method and allowed manual override.

Charts not updating after CRUD: Solved by lifting state up and adding onSuccess callbacks to re-fetch API data.

GitHub push issues: Branch mismatch (main vs master) → solved by renaming branch and syncing remote.

⚖️ Trade-offs

Used SQLite (simple for demo) instead of PostgreSQL.

Focused on core features (CRUD + analytics + charts) rather than advanced authentication.

Accepted some UI imperfections in favor of finishing backend logic first.

🌱 Future Improvements

Add multi-user authentication.

Deployment to cloud (Heroku/Render + PostgreSQL).

Notifications (email/push) for upcoming renewals.

Data export (CSV/Excel).

💡 Reflection

My biggest learning was picking up Django from scratch in a short time.

Using Tech With Tim’s course gave me a foundation, but I still had to adapt and extend beyond what was covered.

Using AI tools accelerated my work, but I always validated outputs by testing and debugging.

I realized that documentation and clarity are as important as working code.

This project shows my ability to learn fast, think critically, and adapt tools/resources to deliver a working, well-documented solution under time pressure.
