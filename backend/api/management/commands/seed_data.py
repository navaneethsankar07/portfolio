from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Profile, Skill, Project, Experience, Article, ContactMessage

User = get_user_model()

class Command(BaseCommand):
    help = "Seed database with initial portfolio data from Navaneeth Sankar's CV"

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

        # 1. Superuser
        admin_username = "admin"
        admin_email = "navaneethsankar07@gmail.com"
        admin_pass = "admin12345"

        if not User.objects.filter(username=admin_username).exists():
            User.objects.create_superuser(
                username=admin_username,
                email=admin_email,
                password=admin_pass
            )
            self.stdout.write(self.style.SUCCESS(f"Created default admin user: '{admin_username}' (password: '{admin_pass}')"))
        else:
            self.stdout.write("Admin user already exists.")

        # 2. Profile
        Profile.objects.all().delete()
        Profile.objects.create(
            name="Navaneeth Sankar",
            title="Python Full Stack Developer | Django & React",
            headline="Specializing in building scalable full-stack web applications with Python, Django, DRF, and React.",
            bio="Software Developer specializing in building scalable full-stack web applications with Python, Django, Django REST Framework, and React. Skilled in designing RESTful services, database architectures, asynchronous workflows, and modern frontend applications. Familiar with PostgreSQL, Redis, Celery, Docker, Kubernetes, and CI/CD practices, with a strong foundation in Data Structures and Algorithms. Focused on writing maintainable software and continuously developing expertise in backend engineering, cloud-native development, and modern DevOps practices.",
            email="navaneethsankar07@gmail.com",
            phone="+91-9495874414",
            location="Kerala, India",
            github_url="https://github.com/navaneethsankar",
            linkedin_url="https://www.linkedin.com/in/navaneethsankar/",
            resume_url="/Navaneeth_Sankar_CV.pdf",
            available_for_hire=True,
            status_text="Open to Full-Stack & Backend Roles",
            avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
            years_experience_label="Full Stack Experience"
        )
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # 3. Skills
        Skill.objects.all().delete()
        skills_data = [
            # Backend
            {"name": "Django", "category": "backend", "proficiency": 95, "icon_name": "Server", "level_label": "Expert", "order": 1},
            {"name": "Django REST Framework (DRF)", "category": "backend", "proficiency": 95, "icon_name": "Cpu", "level_label": "Expert", "order": 2},
            {"name": "Celery & Async Workflows", "category": "backend", "proficiency": 88, "icon_name": "Workflow", "level_label": "Advanced", "order": 3},
            {"name": "Django Channels (WebSockets)", "category": "backend", "proficiency": 85, "icon_name": "Radio", "level_label": "Advanced", "order": 4},
            {"name": "JWT & Role-Based Auth", "category": "backend", "proficiency": 92, "icon_name": "ShieldCheck", "level_label": "Expert", "order": 5},
            
            # Frontend
            {"name": "React.js", "category": "frontend", "proficiency": 92, "icon_name": "Atom", "level_label": "Advanced", "order": 10},
            {"name": "Redux Toolkit", "category": "frontend", "proficiency": 88, "icon_name": "Layers", "level_label": "Advanced", "order": 11},
            {"name": "Tailwind CSS", "category": "frontend", "proficiency": 94, "icon_name": "Palette", "level_label": "Expert", "order": 12},
            {"name": "TypeScript", "category": "frontend", "proficiency": 82, "icon_name": "Code2", "level_label": "Proficient", "order": 13},
            {"name": "shadcn/ui & Radix", "category": "frontend", "proficiency": 90, "icon_name": "Component", "level_label": "Advanced", "order": 14},

            # Programming Languages
            {"name": "Python", "category": "programming", "proficiency": 95, "icon_name": "FileCode2", "level_label": "Expert", "order": 20},
            {"name": "JavaScript (ES6+)", "category": "programming", "proficiency": 90, "icon_name": "Code", "level_label": "Advanced", "order": 21},
            {"name": "Data Structures & Algorithms", "category": "programming", "proficiency": 85, "icon_name": "Binary", "level_label": "Advanced", "order": 22},

            # Databases & Caching
            {"name": "PostgreSQL", "category": "database", "proficiency": 90, "icon_name": "Database", "level_label": "Advanced", "order": 30},
            {"name": "Redis (Caching & Queues)", "category": "database", "proficiency": 88, "icon_name": "Zap", "level_label": "Advanced", "order": 31},
            {"name": "Elasticsearch", "category": "database", "proficiency": 75, "icon_name": "Search", "level_label": "Intermediate", "order": 32},

            # Cloud & DevOps
            {"name": "Docker & Containerization", "category": "devops", "proficiency": 84, "icon_name": "Box", "level_label": "Advanced", "order": 40},
            {"name": "AWS EC2 Deployment", "category": "devops", "proficiency": 80, "icon_name": "Cloud", "level_label": "Proficient", "order": 41},
            {"name": "CI/CD (GitHub Actions)", "category": "devops", "proficiency": 82, "icon_name": "GitMerge", "level_label": "Proficient", "order": 42},
            {"name": "Nginx & Reverse Proxies", "category": "devops", "proficiency": 80, "icon_name": "Globe", "level_label": "Proficient", "order": 43},
            {"name": "Kubernetes Basics", "category": "devops", "proficiency": 70, "icon_name": "Boxes", "level_label": "Intermediate", "order": 44},

            # Tools & Integrations
            {"name": "Git & GitHub", "category": "tools", "proficiency": 92, "icon_name": "GitBranch", "level_label": "Expert", "order": 50},
            {"name": "PayPal Payment Gateway", "category": "tools", "proficiency": 85, "icon_name": "CreditCard", "level_label": "Advanced", "order": 51},
            {"name": "Cloudinary Media CDN", "category": "tools", "proficiency": 88, "icon_name": "Image", "level_label": "Advanced", "order": 52},
            {"name": "SonarQube Code Quality", "category": "tools", "proficiency": 78, "icon_name": "CheckCircle2", "level_label": "Intermediate", "order": 53},
        ]

        for s in skills_data:
            Skill.objects.create(**s)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(skills_data)} skills."))

        # 4. Projects
        Project.objects.all().delete()
        projects_data = [
            {
                "title": "GROLANCE",
                "slug": "grolance-freelancing-platform",
                "subtitle": "Full-Stack Freelancing Platform with Role-Based Workflows",
                "category": "fullstack",
                "description": "A comprehensive full-stack web application designed to connect clients and freelance professionals through smooth role-based workflows. Features robust identity verification, milestone-based contract management, integrated PayPal escrow payments, dispute handling, and real-time alerts.",
                "architecture_notes": "Engineered with Django REST Framework backend paired with a high-performance React client. Implemented secure stateless authentication using JWT and role-based permissions (RBAC). Integrated PostgreSQL for ACID-compliant financial and contract records, combined with Redis and Celery for background processing of notifications, invoice generation, and dispute resolution workflows.",
                "tech_stack": ["Django", "Django REST Framework", "React.js", "PostgreSQL", "Redis", "Celery", "JWT", "TailwindCSS", "PayPal API"],
                "key_features": [
                    "Role-based workflows with dynamic access permissions for Clients and Freelancers",
                    "Stateless JWT authentication and secure refresh rotation",
                    "Proposal submission, bidding system, and milestone contract lifecycle",
                    "End-to-end payment integration using PayPal sandbox and webhooks",
                    "Asynchronous email alerts, notifications, and PDF invoice generation with Celery",
                    "Dispute resolution portal with administrative arbitration tools"
                ],
                "live_url": "https://grolance.demo.app",
                "github_url": "https://github.com/navaneethsankar/Grolance-Freelance-Platform",
                "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
                "featured": True,
                "order": 1,
            },
            {
                "title": "ChitChat",
                "slug": "chitchat-realtime-messaging",
                "subtitle": "Real-Time WebSocket Messaging Platform",
                "category": "realtime",
                "description": "A low-latency real-time communication platform engineered with Django Channels and WebSockets. Provides instant direct messaging, online presence indicators, read receipts, and typing indicators wrapped in a sleek, responsive interface.",
                "architecture_notes": "Utilizes Django Channels ASGI server architecture backed by Redis channel layers for distributed message routing. Features custom WebSocket consumer authentication via JWT query token validation, sub-millisecond message broadcasts, and optimistic client-side UI updates.",
                "tech_stack": ["React.js", "Django", "Django REST Framework", "Django Channels", "WebSockets", "Redis", "PostgreSQL", "TailwindCSS"],
                "key_features": [
                    "Bidirectional full-duplex WebSocket communication with zero polling latency",
                    "Channel layer broadcasting backed by in-memory Redis instances",
                    "JWT-authenticated WebSocket handshake with token validation",
                    "User presence tracking (Online / Offline / Idle) with heartbeat detection",
                    "Real-time typing feedback and message delivery statuses",
                    "Optimistic UI rendering and unread message counters"
                ],
                "live_url": "https://chitchat.demo.app",
                "github_url": "https://github.com/navaneethsankar/ChitChat-RealTime-Messaging",
                "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
                "featured": True,
                "order": 2,
            },
            {
                "title": "ReStore",
                "slug": "restore-c2c-marketplace",
                "subtitle": "C2C Marketplace Platform for Pre-Owned Goods",
                "category": "marketplace",
                "description": "A customer-to-customer marketplace engineered for discovering, buying, and selling pre-owned goods. Includes multi-image upload with Cloudinary transformation, geospatial listing filtering, and centralized state management.",
                "architecture_notes": "Built on React and Vite for blazing fast hot reloading and minimal bundle sizes. Utilizes Redux Toolkit for unified global state (cart, active filters, search index). Cloudinary integration handles automated image compression and format optimization.",
                "tech_stack": ["React.js", "Vite", "Redux Toolkit", "Firebase", "Cloudinary", "TailwindCSS"],
                "key_features": [
                    "Dynamic multi-step product listing with instant drag-and-drop image uploads",
                    "Cloudinary image transformation, auto-compression, and responsive srcset generation",
                    "Global filter engine (Price range, Category, Condition, Location) powered by Redux Toolkit",
                    "Secure authentication, wishlist sync, and seller contact direct messaging",
                    "Optimized mobile-first interface designed for smooth touch navigation"
                ],
                "live_url": "https://restore-marketplace.demo.app",
                "github_url": "https://github.com/navaneethsankar/ReStore-Marketplace",
                "image_url": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1000&auto=format&fit=crop&q=80",
                "featured": True,
                "order": 3,
            }
        ]

        for p in projects_data:
            Project.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(projects_data)} projects."))

        # 5. Experience / Education
        Experience.objects.all().delete()
        experiences_data = [
            {
                "title": "Professional Training – Full Stack Development (Django + React)",
                "organization": "Brototype",
                "location": "Kerala, India",
                "period": "May 2025 – Present",
                "description": "Intensive hands-on professional software engineering training focused on building scalable, production-grade applications using Python, Django, DRF, and React.",
                "key_achievements": [
                    "Built and deployed full-stack applications using Django, Django REST Framework, React, and PostgreSQL",
                    "Designed and developed RESTful APIs with JWT authentication and role-based access control",
                    "Implemented real-time communication and background processing using Django Channels, Redis, and Celery",
                    "Integrated frontend applications with backend services and third-party APIs (PayPal, Cloudinary)",
                    "Applied Git-based workflows, debugging, testing, and performance optimization practices",
                    "Strengthened skills in writing maintainable code, troubleshooting issues, and optimizing database query performance."
                ],
                "technologies": ["Python", "Django", "DRF", "React", "PostgreSQL", "Redis", "Celery", "Channels", "Docker", "Git"],
                "is_education": True,
                "order": 1,
            }
        ]

        for exp in experiences_data:
            Experience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(experiences_data)} experiences."))

        # 6. Articles / Blog
        Article.objects.all().delete()
        articles_data = [
            {
                "title": "Architecting Asynchronous Task Queues with Django, Celery & Redis",
                "slug": "django-celery-redis-async-queues",
                "summary": "How to decouple long-running background tasks like email dispatch, payment webhooks, and report generation using Celery workers and Redis in high-load Django applications.",
                "read_time": "6 min read",
                "tags": ["Django", "Celery", "Redis", "Backend Architecture"],
                "views": 218,
                "content": """
## Introduction

In modern web development, users expect snappy sub-100ms response times. However, real-world applications frequently require operations that take several seconds—such as generating invoices, sending transactional emails, or processing third-party webhook callbacks.

Running these operations synchronously within a standard Django HTTP request-response cycle blocks worker threads, exhausts server resources, and leads to HTTP 504 Gateway Timeouts.

In this article, I walk through how I designed the background task pipeline for **GROLANCE** using **Celery** as the distributed task queue and **Redis** as the message broker.

---

### The Problem with Synchronous Processing

Consider a user submitting a project milestone payment. The backend must:
1. Validate the transaction with PayPal's API.
2. Record the transaction in PostgreSQL.
3. Generate a downloadable PDF invoice.
4. Send email confirmation to both client and freelancer.
5. Broadcast real-time notifications to user dashboards.

If executed synchronously, step 3 and 4 alone can easily take 3 to 5 seconds. If an email server experiences latency, the user waits with an unresponsive browser.

---

### The Solution: Celery + Redis

By offloading the PDF creation and email notifications to an asynchronous worker:
- The main Django HTTP view validates and records the transaction in < 80ms.
- An async Celery task is dispatched: `generate_invoice_and_notify.delay(order_id)`.
- Redis queues the payload instantly.
- Independent Celery worker processes pick up the task and execute it in the background without affecting API responsiveness.

---

### Key Takeaways
- Always make background tasks **idempotent** so that network retries never cause duplicate charges or duplicate emails.
- Keep message payloads small: pass database primary keys (`order_id`) rather than bulky serialized objects.
- Monitor task latency and worker health using tools like Flower.
                """
            },
            {
                "title": "Building Low-Latency Real-Time Applications with Django Channels and WebSockets",
                "slug": "realtime-django-channels-websockets",
                "summary": "Deep dive into ASGI, WebSocket consumer lifecycle, channel layers, and JWT authentication for building responsive real-time chat platforms like ChitChat.",
                "read_time": "5 min read",
                "tags": ["WebSockets", "Django Channels", "Redis", "React"],
                "views": 340,
                "content": """
## Why WebSockets Over Traditional Polling?

Traditional HTTP is unidirectional: the client requests, and the server responds. For real-time applications such as messaging or live auctions, developers often resort to short or long polling. However, polling generates immense server overhead with redundant HTTP headers and delayed message delivery.

WebSockets establish a persistent, bidirectional full-duplex TCP connection, enabling the server to push updates to the client with sub-millisecond overhead.

---

### The ASGI Architecture in Django

Django traditionally operates on WSGI (synchronous). With **Django Channels**, Django is upgraded to support ASGI (Asynchronous Server Gateway Interface), allowing it to handle long-lived connections such as WebSockets and Server-Sent Events.

In **ChitChat**, we set up:
- `ProtocolTypeRouter` to route standard HTTP traffic to traditional Django views and WebSocket protocols to Channels routing.
- Custom `TokenAuthMiddleware` that intercepts the initial WebSocket handshake, verifies the JWT token from query parameters, and binds the authenticated user instance to the WebSocket scope.

---

### Channel Layers with Redis

To support scaling across multiple worker instances, Django Channels utilizes **Channel Layers**. When a user sends a chat message:
1. The WebSocket consumer receives the frame.
2. The consumer publishes the message to the group: `channel_layer.group_send(room_group_name, payload)`.
3. Redis distributes the event to all consumers currently subscribed to that chat room.
4. Each consumer pushes the message directly down the client's WebSocket connection.

The result is instant communication with clean separation of concerns!
                """
            },
            {
                "title": "Optimizing Django REST Framework Queries to Eliminate N+1 Problems",
                "slug": "optimizing-drf-queries-select-related",
                "summary": "Practical techniques for analyzing SQL execution times, utilizing select_related, prefetch_related, and Prefetch objects to speed up DRF APIs by over 80%.",
                "read_time": "4 min read",
                "tags": ["Django", "PostgreSQL", "Performance", "Optimization"],
                "views": 185,
                "content": """
## The Silent Performance Killer: N+1 Queries

When building REST APIs with Django REST Framework, it's very easy to inadvertently cause the infamous **N+1 query problem**. This happens when a serializer accesses related foreign keys or many-to-many relationships inside a loop, triggering a separate database query for every single record in the list.

A list endpoint with 50 projects might execute 51 queries instead of 2, degrading API latency from 40ms to 900ms.

---

### The Cure: `select_related` vs `prefetch_related`

- **`select_related`**: Uses SQL `JOIN` to fetch foreign key or one-to-one relations in a single SQL query. Perfect for `Project.category` or `User.profile`.
- **`prefetch_related`**: Executes a separate lookup using SQL `IN (...)` and performs Python-level joining. Ideal for many-to-many relationships (e.g. `Project.tech_stack` or `Contract.milestones`).

---

### Before and After Benchmark

In testing on a dataset with 500 records:
- **Unoptimized**: 101 SQL queries, ~820ms response time.
- **Optimized with `select_related` and `prefetch_related`**: 2 SQL queries, ~45ms response time (94% speedup!).

Always keep a close eye on your SQL query logs using Django Debug Toolbar or query profiling tools during development.
                """
            }
        ]

        for art in articles_data:
            Article.objects.create(**art)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(articles_data)} articles."))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))

