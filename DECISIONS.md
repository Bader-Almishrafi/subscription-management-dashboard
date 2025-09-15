🧠 Learning Journey

Before this project, I had no prior experience with Django. To complete the assessment, I relied on two main learning resources:

YouTube: Django & React – Full Stack Web App Tutorial by Tech With Tim (https://www.youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j)

AI Tools (ChatGPT): for guidance, code snippets, and debugging help.

Additionally, on the frontend, I used a ready-made React + TailwindCSS template from the internet, which I had also adapted previously in my graduation project. This allowed me to focus more on integrating the backend APIs and analytics, instead of starting UI design from scratch.

I did not just copy solutions. Instead, I:

Watched the tutorials to understand Django models, REST APIs, and integration with React.

Used AI to generate drafts or clarify errors.

Adapted a pre-existing frontend template for a modern UI.

Validated every suggestion and customization by testing it in my codebase.

This approach showed me that I can quickly learn new frameworks, reuse templates effectively, and still make informed technical decisions.

🏗️ Architectural Decisions
Backend

Framework: Django + Django REST Framework

✅ Fast API development and built-in validations.

❌ Learning curve was steep, but manageable.

Model Design: Subscription with fields:

name, category, cost, billing_cycle, start_date, renewal_date, is_active

Auto-calculates renewal_date when missing.

Soft delete via is_active flag → keeps data for analytics.

Stats Endpoint: /api/subscriptions/stats/

Provides monthly spend, projected yearly, upcoming renewals, and potential yearly savings.

Frontend

Framework: React

Styling: TailwindCSS

Charts: Recharts

Animations: Framer Motion

Template: Started from a ready-made dashboard template (React + TailwindCSS), which was then integrated with my backend logic.

🐛 Challenges & Debugging

CORS errors → solved with django-cors-headers.

Renewal date auto-calculation → fixed in save() method with fallback logic.

Charts not refreshing after CRUD → solved with onSuccess callbacks to re-fetch data.

GitHub push issues → fixed branch mismatch (master vs main).

⚖️ Trade-offs

SQLite instead of PostgreSQL for demo simplicity.

Focused on core features (CRUD + analytics) over advanced auth.

Reused a UI template instead of building design from scratch → saved time, consistent design.

🌱 Future Improvements

Authentication and user accounts.

Cloud deployment with PostgreSQL.

Notifications for upcoming renewals.

Export data to CSV/Excel.

💡 Reflection

Learned Django from scratch quickly via tutorials.

Reused and customized an existing React template effectively.

Used AI tools for acceleration, but validated and adapted outputs.

Balanced trade-offs (time vs features) to deliver a working, well-documented solution.
