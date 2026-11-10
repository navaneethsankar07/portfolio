from django.contrib import admin
from .models import Profile, Skill, Project, Experience, Article, ContactMessage, VisitorStat

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'phone', 'available_for_hire', 'updated_at')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'level_label', 'featured', 'order')
    list_filter = ('category', 'featured')
    search_fields = ('name',)
    list_editable = ('proficiency', 'featured', 'order')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order', 'created_at')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('featured', 'order')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'period', 'is_education', 'order')
    list_filter = ('is_education',)
    list_editable = ('order',)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'published', 'views', 'read_time', 'created_at')
    list_filter = ('published',)
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)

@admin.register(VisitorStat)
class VisitorStatAdmin(admin.ModelAdmin):
    list_display = ('path', 'ip_hash', 'visited_at')
    list_filter = ('visited_at',)
    readonly_fields = ('visited_at',)
