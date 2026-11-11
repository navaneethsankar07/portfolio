# Navaneeth Sankar — Modern Full-Stack Portfolio

A high-performance, cyber-glassmorphism portfolio website built with a **Django REST Framework** backend and a **React 18 + TypeScript + Vite + Tailwind CSS** frontend.

Designed specifically to showcase the capabilities of a **Python Full Stack Developer (Django & React)**, complete with an **Interactive Dev CLI Terminal**, **Cmd+K Command Palette**, **Dynamic Particle Mesh Background**, and a **Custom React Admin Workspace** for managing projects, skills, articles, and recruiter inquiries without editing code.

---

## 🌟 Key Features

### 🖥️ Frontend (React + Vite + TypeScript)
- **Modern Cyber-Glassmorphism UI**: Deep slate dark theme (`#07090E`), glowing cyan/purple accents, backdrop filters, and subtle ambient lighting.
- **Interactive Particle Background**: Real-time canvas physics with particles connecting to cursor movement.
- **Interactive Developer CLI (`Terminal`)**: Visitors can run commands like `cat bio`, `skills`, `projects`, `contact`, `download-cv`, and `sudo hire-me`.
- **Keyboard-Driven Command Palette (`Cmd+K` / `Ctrl+K`)**: Fast search across sections, projects, and actions.
- **Spotlight Project Cards & Modal**: Deep architectural breakdown highlighting asynchronous Celery queues, Redis caching, Django Channels WebSockets, and database schema optimizations.
- **Categorized Skills Matrix**: Filter by Backend, Frontend, Database, DevOps, Programming, and Tools with animated proficiency indicators.
- **Career & Training Timeline**: Visual progression of Brototype professional training and development milestones.
- **Technical Engineering Notes (Blog)**: Technical articles with an interactive reader modal.
- **Working Contact Transmission Form**: Validated direct submission saved to PostgreSQL/SQLite with confetti animation on success.
- **Instant CV Download**: Dynamic download link for `Navaneeth_Sankar_CV.pdf`.

### ⚡ Backend (Django REST Framework)
- **RESTful Endpoints**: Clean DRF viewsets and views for Profile, Skills, Projects, Experiences, Articles, Inquiries, and Telemetry.
- **JWT Authentication**: Stateless token generation and rotation with `djangorestframework-simplejwt`.
- **Dual Admin Capability**:
  1. **Custom React Admin Workspace**: Integrated dark dashboard directly inside the frontend with live stats, CRUD forms, and message management.
  2. **Django Native Admin**: Full ORM management at `/admin/` (or `http://127.0.0.1:8000/admin/`).
- **Pre-seeded Database**: Loaded with Navaneeth Sankar's real projects (GROLANCE, ChitChat, ReStore), skills, education, and technical blog posts.

---

## 🚀 Quick Start

### Option 1: Run Both with the Single Command
```bash
./run.sh
```
This automatically boots:
- Django Backend at `http://127.0.0.1:8000`
- React Frontend at `http://localhost:5173`

---

### Option 2: Run Backend and Frontend Separately

#### 1. Backend (Django REST Framework)
```bash
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

#### 2. Frontend (React + Vite + TypeScript)
```bash
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔐 Admin Portal Credentials

- **URL**: Click the **Admin** button in the top navbar or open the Cmd+K palette.
- **Default Username**: `admin`
- **Default Password**: `admin12345`

Inside the Admin Workspace, you can:
- **Add / Edit / Delete Projects** (with live links, github links, tech stack tags, architecture notes)
- **Manage Skills & Categories** (adjust proficiency sliders, level badges, Lucide icons)
- **Write Technical Articles** (Markdown editor, tags, published toggle)
- **View Contact Inquiries** (mark read/unread, direct email reply, delete)
- **Edit Personal Profile** (headline, bio, phone, email, links, available for hire status)

---

## 🛠️ Tech Stack Breakdown

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti |
| **Backend** | Python 3.12, Django 6.1, Django REST Framework, SimpleJWT, CORS Headers |
| **Database** | SQLite (Dev) / PostgreSQL (Prod ready) |
| **Real-time / Async (Architecture)** | Django Channels (ASGI WebSockets), Redis, Celery Workers |
| **DevOps & Cloud** | Docker, Nginx, AWS EC2, GitHub Actions CI/CD |

---

## 📁 Repository Structure

```
PORTFOLIO/
├── run.sh                          # Root launch script (starts both backend & frontend)
├── README.md
├── backend/
│   ├── venv/                       # Python virtual environment
│   ├── manage.py
│   ├── db.sqlite3                  # Pre-seeded database
│   ├── portfolio_backend/          # Django project configuration & settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── api/                        # DRF Application
│       ├── models.py               # Profile, Skill, Project, Experience, Article, ContactMessage, VisitorStat
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       ├── admin.py
│       └── management/commands/seed_data.py
└── frontend/
    ├── package.json
    ├── vite.config.ts              # Reverse proxy to Django API
    ├── tailwind.config.js
    ├── public/
    │   └── Navaneeth_Sankar_CV.pdf # Clean downloadable CV
    └── src/
        ├── types/                  # TypeScript interface contracts
        ├── services/api.ts         # Axios client with JWT interceptor
        ├── context/AuthContext.tsx # Admin auth state
        ├── components/             # Public UI components
        │   ├── Navbar.tsx
        │   ├── Hero.tsx
        │   ├── ParticleBackground.tsx
        │   ├── About.tsx
        │   ├── Skills.tsx
        │   ├── Projects.tsx
        │   ├── ProjectModal.tsx
        │   ├── Experience.tsx
        │   ├── Blog.tsx
        │   ├── ArticleModal.tsx
        │   ├── Contact.tsx
        │   ├── InteractiveTerminal.tsx
        │   ├── CommandPalette.tsx
        │   └── Footer.tsx
        └── admin/                  # Custom React Admin Workspace
            ├── AdminPortal.tsx
            ├── DashboardOverview.tsx
            ├── ProjectsManager.tsx
            ├── SkillsManager.tsx
            ├── ArticlesManager.tsx
            ├── MessagesInbox.tsx
            └── ProfileEditor.tsx
```

