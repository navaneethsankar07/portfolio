from django.db import models
from django.utils.text import slugify

class Profile(models.Model):
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=200)
    headline = models.CharField(max_length=300, blank=True, default="")
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default="")
    location = models.CharField(max_length=150, blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    linkedin_url = models.URLField(blank=True, default="")
    resume_url = models.URLField(blank=True, default="")
    available_for_hire = models.BooleanField(default=True)
    status_text = models.CharField(max_length=100, blank=True, default="")
    avatar_url = models.URLField(blank=True, default="")
    years_experience_label = models.CharField(max_length=50, blank=True, default="")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Profile Configuration"
        verbose_name_plural = "Profile Configuration"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('backend', 'Backend Engineering'),
        ('frontend', 'Frontend Development'),
        ('database', 'Databases & Caching'),
        ('devops', 'Cloud & DevOps'),
        ('programming', 'Programming Languages'),
        ('tools', 'Tools & Integrations'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='backend')
    proficiency = models.IntegerField(default=85, help_text="Percentage 1-100")
    icon_name = models.CharField(max_length=50, default="Code", help_text="Lucide icon name")
    level_label = models.CharField(max_length=50, default="Advanced")
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('fullstack', 'Full-Stack Platforms'),
        ('realtime', 'Real-Time & WebSockets'),
        ('marketplace', 'E-Commerce & Marketplaces'),
        ('backend', 'Backend APIs & Microservices'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    subtitle = models.CharField(max_length=250)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='fullstack')
    description = models.TextField()
    architecture_notes = models.TextField(blank=True, default="")
    tech_stack = models.JSONField(default=list)
    key_features = models.JSONField(default=list, blank=True)
    live_url = models.URLField(blank=True, default="")
    github_url = models.URLField(blank=True, default="")
    image_url = models.URLField(blank=True, default="")
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Experience(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    location = models.CharField(max_length=150, blank=True, default="")
    period = models.CharField(max_length=100)
    description = models.TextField()
    key_achievements = models.JSONField(default=list, blank=True)
    technologies = models.JSONField(default=list, blank=True)
    is_education = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.title} @ {self.organization}"


class Article(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=270, unique=True, blank=True)
    summary = models.TextField()
    content = models.TextField()
    tags = models.JSONField(default=list)
    read_time = models.CharField(max_length=30, default="5 min read")
    published = models.BooleanField(default=True)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250, blank=True, default="Portfolio Contact")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"


class VisitorStat(models.Model):
    path = models.CharField(max_length=250, default="/")
    ip_hash = models.CharField(max_length=64, blank=True, default="")
    user_agent = models.CharField(max_length=300, blank=True, default="")
    visited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-visited_at']

    def __str__(self):
        return f"Visit to {self.path} at {self.visited_at}"
